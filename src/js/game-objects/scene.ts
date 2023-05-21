import * as PIXI from 'pixi.js';
import GameObject from './game-object';

export default class Scene {
  app: PIXI.Application;
  children: GameObject[];
  constructor(app) {
    this.app = app;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    child.scene = this;
    this.app.stage.addChild(child.gameObject || child);
  }

  getChildByName(name): any {
    return this.children.find((child) => child.gameObject.name === name);
  }

  removeChild(child) {
    this.app.stage.removeChild(child.gameObject || child);
    this.children.splice(this.children.indexOf(child), 1);
  }
}
