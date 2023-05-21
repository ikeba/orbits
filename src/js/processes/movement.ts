import { Graphics } from 'pixi.js';
import { moveTo, turnTo } from '../utils/movement';
import { DEFAULT_SHIP_SPEED } from '../config';
import { getMovementLine } from '../utils/graphics';
import Ship from '../game-objects/ship';
import Asteroid from '../game-objects/asteroid';
import { getDistance } from '../utils/utils';

type AnimationQueueElement = {
  target: Asteroid,
  animation: () => any,
}
export default class Movement {
  obj: Ship = null;
  position: Asteroid;
  speed: number;

  isMoving = false;
  target: Asteroid = null;

  queue: Array<AnimationQueueElement> = [];
  animationLines: Array<Graphics> = [];

  constructor({
    obj = null,
    position = null,
    speed = DEFAULT_SHIP_SPEED,
  } = {}) {
    this.obj = obj;
    this.speed = speed;
    this.position = position;
  }

  private addAnimationLine(from, to) {
    const line = getMovementLine(from, to);
    this.obj.scene.addChild(line);
    this.animationLines.push(line);
  }

  private removeAnimationLine(line) {
    this.obj.scene.removeChild(line);
    this.animationLines.splice(this.animationLines.indexOf(line), 1);
  }

  private updateCurrentAnimationLine() {
    this.obj.scene.removeChild(this.animationLines[0]);
    this.animationLines[0] = getMovementLine(this.obj, this.queue[0].target);
    this.obj.scene.addChild(this.animationLines[0]);
  }

  private addAnimation({ target, animation }: AnimationQueueElement) {
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

  private endAnimation() {
    this.queue.shift();
    this.removeAnimationLine(this.animationLines[0]);

    if (!this.queue.length) {
      this.stop();
    } else {
      this.queue[0].animation();
    }
  }

  private start() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.queue[0].animation();
    }
  }

  private stop() {
    this.position = this.target;
    this.target = null;
    this.isMoving = false;
  }

  public add(target: Asteroid) {
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

  public getDistanceToTargetFromTheLastQueuePoint(target: Asteroid) {
    const lastQueuePoint = this.queue[this.queue.length - 1]?.target;
    if (!lastQueuePoint) {
      return getDistance(this.obj.x, target.x, this.obj.y, target.y);
    }
    return getDistance(lastQueuePoint.x, target.x, lastQueuePoint.y, target.y);
  }

  public get totalDistanceForTheQueue() {
    if (!this.queue.length && !this.target) {
      return 0;
    }

    const distanceToTheFirstTarget = getDistance(this.obj.x, this.target.x, this.obj.y, this.target.y);

    return this.queue.reduce((acc, { target }, currentIndex) => {
      if (currentIndex === this.queue.length - 1) {
        return acc;
      }
      return acc + getDistance(target.x, this.queue[currentIndex + 1].target.x, target.y, this.queue[currentIndex + 1].target.y);
    }, distanceToTheFirstTarget);
  }
}
