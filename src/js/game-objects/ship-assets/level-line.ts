import * as PIXI from 'pixi.js';
import GameObject from '../game-object';

const DEFAULT_FUEL_LINE_WIDTH = 20;

export default class LevelLine extends GameObject {
  fuelLine: GameObject;

  constructor({
    x = 0,
    y = 0,
    width = DEFAULT_FUEL_LINE_WIDTH,
    height = 2,
    name = 'fuelLine',
    asset = 'assets/img/fuel.png',
  } = {}) {
    super({
      x, y, width, height,
    });

    this.fuelLine = new GameObject({
      name, width, height, asset,
    });

    this.addChild(this.fuelLine);
  }

  /**
   * Change the width of the fuel level line
   * @param fuel - the new fuel level in percentage from 0 to 100
   */
  public changeFuelLevel(fuel: number) {
    (this.fuelLine.gameObject as PIXI.Sprite).width = DEFAULT_FUEL_LINE_WIDTH * (fuel / 100);
  }
}
