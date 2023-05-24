import random from 'lodash/random';
import {
  ASTEROID_SIZE,
  BOUNDS,
  DEFAULT_ASTEROID_ENERGY_LEVEL,
  DEFAULT_LEVEL_LINE_HEIGHT,
  DEFAULT_LEVEL_LINE_WIDTH,
  DefaultGameObjectNames,
  FIELD_SIZE,
  PossibleGameObjectTypes,
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
      type: PossibleGameObjectTypes.Sprite,
      name,
      x,
      y,
      width: ASTEROID_SIZE,
      height: ASTEROID_SIZE,
      asset,
      interactive,
    });

    this.energyLevel = new LevelLine({
      name: `asteroid#${random()}_energyLevel`,
      asset: 'assets/img/asteroid-fuel.png',
      x: -DEFAULT_LEVEL_LINE_WIDTH / 4,
      y: 20,
      width: DEFAULT_LEVEL_LINE_WIDTH / 2,
      height: DEFAULT_LEVEL_LINE_HEIGHT / 2,
      visible: false,
    });

    this.addChild(this.energyLevel);
  }

  onPointerOver() {
    this.energyLevel.gameObject.visible = true;
  }

  onPointerOut() {
    this.energyLevel.gameObject.visible = false;
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
