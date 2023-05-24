import * as PIXI from 'pixi.js';
import GameObject from '../game-object';
import { DEFAULT_LEVEL_LINE_HEIGHT, DEFAULT_LEVEL_LINE_WIDTH, PossibleGameObjectTypes } from '../../config';

export default class LevelLine extends GameObject {
  public value: number;
  line: GameObject;
  fuelLevelCaption: GameObject;
  initialWidth: number;

  constructor({
    x = -DEFAULT_LEVEL_LINE_WIDTH / 2,
    y = 0,
    width = DEFAULT_LEVEL_LINE_WIDTH,
    height = DEFAULT_LEVEL_LINE_HEIGHT,
    name = 'fuelLine',
    asset = 'assets/img/fuel.png',
    anchor = 0,
    showCounter = false,
    value = null,
    visible = true,
  } = {}) {
    super({
      type: PossibleGameObjectTypes.Container,
      x,
      y,
      width,
      height,
      visible,
    });

    if (value) {
      this.value = value;
    }

    this.initialWidth = width;

    this.line = new GameObject({
      type: PossibleGameObjectTypes.Sprite,
      name,
      width,
      height,
      asset,
      anchor,
    });

    this.addChild(this.line);

    if (showCounter) {
      // @todo: make separate gameObject for the captions
      this.fuelLevelCaption = new GameObject({
        type: PossibleGameObjectTypes.Text,
        text: this.value.toFixed(2),
        x: -5,
      });
      (this.fuelLevelCaption.gameObject as PIXI.Text).anchor.set(1, 0.35);
      this.addChild(this.fuelLevelCaption);
    }
  }

  /**
   * Change the width of the fuel level line
   */
  public changeLevel(newLevel, defaultLevel: number) {
    const fuelLevel = (newLevel / defaultLevel) * 100;
    if (this.fuelLevelCaption) {
      (this.fuelLevelCaption.gameObject as PIXI.Text).text = newLevel.toFixed(2);
    }
    (this.line.gameObject as PIXI.Sprite).width = this.initialWidth * (fuelLevel / 100);
    return fuelLevel;
  }
}
