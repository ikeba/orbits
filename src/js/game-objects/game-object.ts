import * as PIXI from 'pixi.js';
import Scene from './scene';
import { turnTo } from '../utils/movement';

export default class GameObject {
  gameObject: PIXI.Container | PIXI.Sprite;
  scene?: Scene;
  texture?: PIXI.Texture;
  defaultAngle = 0;

  constructor({
    name = null,
    x = 0,
    y = 0,
    width = 5,
    height = 5,
    interactive = false,
    asset = null,
    anchor = 0.5,
  }) {
    if (asset) {
      this.texture = PIXI.Texture.from(asset);
      this.gameObject = new PIXI.Sprite(this.texture);
      this.gameObject.width = width;
      this.gameObject.height = height;
      // @ts-ignore
      this.gameObject.anchor.set(anchor);
    } else {
      this.gameObject = new PIXI.Container();
    }

    this.gameObject.x = x;
    this.gameObject.y = y;

    if (name) {
      this.gameObject.name = name;
    }

    if (interactive) {
      this.gameObject.eventMode = 'static';
      this.gameObject.cursor = 'pointer';
      this.gameObject.on('pointertap', this.onTap.bind(this));
    }
  }

  get x() {
    return this.gameObject.x;
  }

  set x(newX) {
    this.gameObject.x = newX;
  }

  get y() {
    return this.gameObject.y;
  }

  set y(newY) {
    this.gameObject.y = newY;
  }

  get app() {
    return this.scene.app;
  }

  addChild(child: GameObject) {
    this.gameObject.addChild(child.gameObject);
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  onTap(event: PIXI.FederatedEvent) {}

  public turnToDefaultAngle() {
    turnTo({ obj: this.gameObject, angleToTurn: this.defaultAngle });
  }
}
