import GameObject from './game-object';
import BlasterShot from './weapons/blasterShot';
import Movement from '../processes/movement';

export default class Ship extends GameObject {
  constructor({
    position,
  } = {}) {
    const name = 'playerShip';
    const asset = 'assets/png/playerShip3_green.png';
    const width = 10;
    const height = 10;

    super({
      name, asset, width, height, x: position.gameObject.x, y: position.gameObject.y,
    });

    this.movement = new Movement({ obj: this, position });
  }

  moveTo(target) {
    if (target === this.movement.position) {
      console.warn('Impossible to move to the same position');
      return;
    }
    this.movement.add(target);
  }

  hitByBlaster(target) {
    if (target === this.movement.position) {
      console.warn('Impossible to hit the same position');
      return;
    }
    this.scene.addChild(new BlasterShot(this.x, this.y, target));
  }
}
