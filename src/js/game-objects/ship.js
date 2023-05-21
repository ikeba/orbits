import GameObject from './game-object';
import { FIELD_SIZE } from '../config';
import Blaster from './weapons/blaster';
import Movement from '../processes/movement';

export default class Ship extends GameObject {
  constructor({
    x = FIELD_SIZE / 2,
    y = FIELD_SIZE / 2,
  } = {}) {
    const name = 'playerShip';
    const asset = 'assets/png/playerShip3_green.png';
    const width = 10;
    const height = 10;

    super({
      name, asset, width, height, x, y,
    });

    this.movement = new Movement({ obj: this });
  }

  moveTo(target) {
    this.movement.add(target);

    // let movementLine;
    //
    // turnTo(this.gameObject, target);
    // moveTo({
    //   obj: this,
    //   target,
    //   onUpdate: () => {
    //     if (movementLine) {
    //       this.scene.removeChild(movementLine);
    //     }
    //     movementLine = drawMovementLine(this, target);
    //     this.scene.addChild(movementLine);
    //   },
    //   onComplete: () => {
    //     this.isMoving = false;
    //   },
    // });
  }

  hitByBlaster(target) {
    this.scene.addChild(new Blaster(this.x, this.y, target));
  }
}
