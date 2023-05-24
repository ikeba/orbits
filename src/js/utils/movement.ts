import gsap from 'gsap';
import { getAngle, getTravelTime } from './utils';

export function turnTo({ obj, parentObj = null, target = null, immediately = false, angleToTurn = null }) {
  const container = parentObj || obj;
  const angle = angleToTurn !== null ? angleToTurn : getAngle(container.x, target.x, container.y, target.y) + 90;
  if (immediately) {
    obj.angle = angle;
    return;
  }
  gsap.to(obj, { angle });
}

export function moveTo({
  obj = null,
  target = null,
  speed = null,
  onComplete = () => {},
  onUpdate = () => {},
  ease = 'none',
} = {}) {
  if (!obj || !target || !speed) {
    console.error('Not enough arguments to move the object');
    return;
  }
  const duration = getTravelTime(obj.x, target.x, obj.y, target.y, speed);
  gsap.to(obj, {
    duration,
    x: target.x,
    y: target.y,
    onComplete,
    onUpdate,
    ease,
  });
}
