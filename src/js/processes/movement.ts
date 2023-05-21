import { turnTo, moveTo } from '../utils/movement';
import { DEFAULT_SHIP_SPEED } from '../config';
import { getMovementLine } from '../utils/graphics';
import Ship from '../game-objects/ship';
import Asteroid from '../game-objects/asteroid';

export default class Movement {
  obj: Ship = null;
  position: Asteroid;
  speed: number;

  isMoving = false;
  target: Asteroid = null;

  queue: Array<{ target: Asteroid, animation: any }> = [];
  animationLines: Array<any> = [];

  constructor({
    obj = null,
    position = null,
    speed = DEFAULT_SHIP_SPEED,
  } = {}) {
    this.obj = obj;
    this.speed = speed;
    this.position = position;
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

  updateCurrentAnimationLine() {
    this.obj.scene.removeChild(this.animationLines[0]);
    this.animationLines[0] = getMovementLine(this.obj, this.queue[0].target);
    this.obj.scene.addChild(this.animationLines[0]);
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

  add(target: Asteroid) {
    if (target === this.queue[this.queue.length - 1]?.target) {
      console.warn('Duplicated final position');
      return;
    }
    const animation = () => {
      this.position = null;
      this.target = target;
      turnTo({ obj: this.obj.assets.ship.gameObject, parentObj: this.obj.gameObject, target });
      return moveTo({
        obj: this.obj, target, speed: this.speed, onUpdate: () => this.updateCurrentAnimationLine(), onComplete: () => this.endAnimation(),
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
    this.position = this.target;
    this.target = null;
    this.isMoving = false;
  }
}
