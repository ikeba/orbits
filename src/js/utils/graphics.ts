import * as PIXI from 'pixi.js';

export function getMovementLine(from, to) {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(1, 0xFFFFFF, 0.2);
  graphics.moveTo(from.x, from.y);
  graphics.lineTo(to.x, to.y);

  return graphics;
}
