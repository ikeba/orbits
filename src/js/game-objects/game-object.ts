import * as PIXI from 'pixi.js';
import Scene from './scene';
import { turnTo } from '../utils/movement';
import { PossibleGameObjectTypes } from '../config';

export default class GameObject {
  gameObject: PIXI.Container | PIXI.Sprite | PIXI.Text;
  scene?: Scene;
  texture?: PIXI.Texture;
  defaultAngle = 0;

  constructor({
    type,
    name = null,
    x = 0,
    y = 0,
    width = 5,
    height = 5,
    interactive = false,
    asset = null,
    anchor = 0.5,
    text = null,
    visible = true,
  }: {
    type: PossibleGameObjectTypes;
    [key: string]: any;
  }) {
    if (type === PossibleGameObjectTypes.Sprite) {
      this.texture = PIXI.Texture.from(asset);
      this.gameObject = new PIXI.Sprite(this.texture);
      this.gameObject.width = width;
      this.gameObject.height = height;
    } else if (type === PossibleGameObjectTypes.Container) {
      this.gameObject = new PIXI.Container();
      // @ts-ignore
    } else if (type === PossibleGameObjectTypes.Text) {
      // @todo: add gameObject for text
      const style = new PIXI.TextStyle({
        fontFamily: 'Roboto, sans-serif',
        fontSize: 13,
        fill: '#ffffff',
      });

      this.gameObject = new PIXI.Text(text, style);
    }

    // @ts-ignore
    this.gameObject.anchor?.set(anchor);
    this.gameObject.x = x;
    this.gameObject.y = y;
    this.gameObject.visible = visible;

    if (name) {
      this.gameObject.name = name;
    }

    if (interactive) {
      this.gameObject.eventMode = 'static';
      this.gameObject.cursor = 'pointer';

      this.gameObject.on('pointertap', this.onTap.bind(this));
      this.gameObject.on('pointerover', this.onPointerOver.bind(this));
      this.gameObject.on('pointerout', this.onPointerOut.bind(this));
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
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  onPointerOver(event: PIXI.FederatedEvent) {}
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  onPointerOut(event: PIXI.FederatedEvent) {}

  public turnToDefaultAngle() {
    turnTo({ obj: this.gameObject, angleToTurn: this.defaultAngle });
  }
}
