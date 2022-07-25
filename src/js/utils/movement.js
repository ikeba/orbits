import gsap from 'gsap';
import { getAngle, getTravelTime } from './utils';

export function turnTo(obj, target, immediately = false) {
  const angle = getAngle(obj.x, target.x, obj.y, target.y) + 90;
  if (immediately) {
    obj.angle = angle;
    return;
  }
  gsap.to(obj, { angle });
}

export function moveTo(obj, target, onComplete) {
  const duration = getTravelTime(obj.x, target.x, obj.y, target.y, obj.speed);
  gsap.to(obj, {
    duration, x: target.x, y: target.y, onComplete,
  });
}
