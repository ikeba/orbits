import * as PIXI from 'pixi.js';
import GameObject from '../game-object';

const DEFAULT_LINE_WIDTH = 20;

export default class LevelLine extends GameObject {
  line: GameObject;

  constructor({
    x = -DEFAULT_LINE_WIDTH / 2,
    y = 0,
    width = DEFAULT_LINE_WIDTH,
    height = 2,
    name = 'fuelLine',
    asset = 'assets/img/fuel.png',
    anchor = 0,
  } = {}) {
    super({
      x, y, width, height,
    });

    this.line = new GameObject({
      name, width, height, asset, anchor,
    });

    this.addChild(this.line);
  }

  /**
   * Change the width of the fuel level line
   */
  public changeLevel(newLevel, defaultLevel: number) {
    const fuelLevel = (newLevel / defaultLevel) * 100;
    (this.line.gameObject as PIXI.Sprite).width = DEFAULT_LINE_WIDTH * (fuelLevel / 100);
    return fuelLevel;
  }
}
