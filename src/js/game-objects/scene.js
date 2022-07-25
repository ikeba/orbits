export default class Scene {
  constructor(app) {
    this.app = app;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    child.scene = this;
    this.app.stage.addChild(child.gameObject);
  }

  getChildByName(name) {
    return this.children.find((child) => child.gameObject.name === name);
  }

  removeChild(child) {
    this.app.stage.removeChild(child.gameObject);
    this.children.splice(this.children.indexOf(child), 1);
  }
}
