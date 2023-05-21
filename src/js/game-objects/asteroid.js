import random from 'lodash/random';
import { BOUNDS, FIELD_SIZE } from '../config';
import GameObject from './game-object';

export default class Asteroid extends GameObject {
  constructor({
    x = random(BOUNDS, FIELD_SIZE - BOUNDS),
    y = random(BOUNDS, FIELD_SIZE - BOUNDS),
  } = {}) {
    const asset = 'assets/png/Meteors/meteorGrey_med1.png';
    const interactive = true;
    super({
      x, y, asset, interactive,
    });
  }

  onTap(event) {
    const ship = this.scene.getChildByName('playerShip');
    if (event.data.originalEvent.metaKey) {
      ship.hitByBlaster(this);
      return;
    }
    ship.moveTo(this);
  }
}
