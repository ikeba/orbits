export function getDistance(x1, x2, y1, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function getAngle(x1, x2, y1, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

export function getTravelTime(x1, x2, y1, y2, speed) {
  return getDistance(x1, x2, y1, y2) / speed;
}
