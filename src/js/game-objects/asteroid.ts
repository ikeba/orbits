import random from 'lodash/random';
import {
  BOUNDS, DEFAULT_ASTEROID_ENERGY_LEVEL, DefaultGameObjectNames, FIELD_SIZE,
} from '../config';
import GameObject from './game-object';
import Ship from './ship';
import LevelLine from './ship-assets/level-line';

export default class Asteroid extends GameObject {
  public energy = DEFAULT_ASTEROID_ENERGY_LEVEL;
  private readonly energyLevel: LevelLine;
  constructor({
    name = `asteroid#${random()}`,
    x = random(BOUNDS, FIELD_SIZE - BOUNDS),
    y = random(BOUNDS, FIELD_SIZE - BOUNDS),
  } = {}) {
    const asset = 'assets/img/asteroid.png';
    const interactive = true;
    super({
      name, x, y, asset, interactive,
    });

    this.energyLevel = new LevelLine({
      name: `asteroid#${random()}_energyLevel`,
      asset: 'assets/img/asteroid-fuel.png',
      y: 20,
    });

    this.addChild(this.energyLevel);
  }

  onTap(event) {
    const ship: Ship = this.scene.getChildByName(DefaultGameObjectNames.PlayerShip);
    if (event.data.originalEvent.metaKey) {
      ship.hitByBlaster(this);
      return;
    }
    ship.moveTo(this);
  }

  public consumeEnergy(amount: number) {
    this.energy -= amount;
    this.energyLevel.changeLevel(this.energy, DEFAULT_ASTEROID_ENERGY_LEVEL);
  }
}
