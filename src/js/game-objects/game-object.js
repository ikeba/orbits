import * as PIXI from 'pixi.js';

export default class GameObject {
  constructor({
    name,
    x = 0,
    y = 0,
    width = 5,
    height = 5,
    interactive = false,
    asset,
  }) {
    this.texture = PIXI.Texture.from(asset);
    this.gameObject = new PIXI.Sprite(this.texture);
    this.gameObject.anchor.set(0.5);
    this.gameObject.x = x;
    this.gameObject.y = y;
    this.gameObject.width = width;
    this.gameObject.height = height;

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

  // eslint-disable-next-line class-methods-use-this
  onTap() {}
}
