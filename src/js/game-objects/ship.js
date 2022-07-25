import GameObject from './game-object';
import { SIZE } from '../config';
import { moveTo, turnTo } from '../utils/movement';
import Blaster from './weapons/blaster';

export default class Ship extends GameObject {
  constructor({
    x = SIZE / 2,
    y = SIZE / 2,
  } = {}) {
    const name = 'playerShip';
    const asset = 'assets/png/playerShip3_green.png';
    const width = 10;
    const height = 10;

    super({
      name, asset, width, height, x, y,
    });

    this.isMoving = false;
    this.speed = 25;
  }

  moveTo(target) {
    if (this.isMoving) {
      return;
    }
    this.isMoving = true;
    turnTo(this.gameObject, target);
    moveTo(this, target, () => {
      this.isMoving = false;
    });
  }

  hitByBlaster(target) {
    this.scene.addChild(new Blaster(this.x, this.y, target));
  }
}
