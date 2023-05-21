import GameObject from '../game-object';
import { moveTo, turnTo } from '../../utils/movement';

export default class Blaster extends GameObject {
  constructor(x, y, target) {
    const asset = 'assets/png/Lasers/laserBlue01.png';
    const width = 2;
    const height = 5;
    super({
      x, y, asset, width, height,
    });
    this.target = target;
    this.speed = 75;
    this.flyToTarget();
  }

  flyToTarget() {
    turnTo(this.gameObject, this.target, true);
    moveTo({
      obj: this,
      target: this.target,
      onComplete: () => this.scene.removeChild(this),
    });
  }
}
