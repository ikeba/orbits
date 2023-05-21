export function getDistance(x1: number, x2: number, y1: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function getAngle(x1: number, x2: number, y1: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

export function getTravelTime(x1: number, x2: number, y1: number, y2: number, speed: number): number {
  return getDistance(x1, x2, y1, y2) / speed;
}
