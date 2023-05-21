import { turnTo, moveTo } from '../utils/movement';
import { DEFAULT_SHIP_SPEED } from '../config';
import { getMovementLine } from '../utils/graphics';

export default class Movement {
  constructor({
    obj,
    speed = DEFAULT_SHIP_SPEED,
  } = {}) {
    this.obj = obj;
    this.speed = speed;

    this.isMoving = false;
    this.queue = [];
    this.animationLines = [];
  }

  addAnimationLine(from, to) {
    const line = getMovementLine(from, to);
    this.obj.scene.addChild(line);
    this.animationLines.push(line);
  }

  removeAnimationLine(line) {
    this.obj.scene.removeChild(line);
    this.animationLines.splice(this.animationLines.indexOf(line), 1);
  }

  addAnimation({ target, animation }) {
    if (this.queue.length) {
      this.addAnimationLine(this.queue[this.queue.length - 1].target, target);
    } else {
      this.addAnimationLine(this.obj, target);
    }
    this.queue.push({
      target,
      animation,
    });
  }

  add(target) {
    const animation = () => {
      turnTo(this.obj.gameObject, target);
      return moveTo({
        obj: this.obj, target, speed: this.speed, onComplete: () => this.endAnimation(),
      });
    };

    this.addAnimation({ target, animation });

    this.start();
  }

  endAnimation() {
    this.queue.shift();
    this.removeAnimationLine(this.animationLines[0]);

    if (!this.queue.length) {
      this.stop();
    } else {
      this.queue[0].animation();
    }
  }

  start() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.queue[0].animation();
    }
  }

  stop() {
    this.isMoving = false;
  }
}
