import GameObject from '../game-object';

export default class LevelLine extends GameObject {
  constructor({
    x = 0,
    y = 0,
    width = 20,
    height = 2,
    interactive = false,
    asset = 'assets/img/fuel.png',
  } = {}) {
    super({
      x, y, width, height, interactive, asset,
    });
  }
}
