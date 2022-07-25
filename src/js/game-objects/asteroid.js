import random from 'lodash/random';
import { BOUNDS, SIZE } from '../config';
import GameObject from './game-object';

export default class Asteroid extends GameObject {
  constructor() {
    const asset = 'assets/png/Meteors/meteorGrey_med1.png';
    const interactive = true;
    const x = random(BOUNDS, SIZE - BOUNDS);
    const y = random(BOUNDS, SIZE - BOUNDS);
    super({
      x, y, asset, interactive,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onTap(event) {
    const ship = this.scene.getChildByName('playerShip');
    if (event.data.originalEvent.metaKey) {
      ship.hitByBlaster(this);
      return;
    }
    ship.moveTo(this);
  }
}
