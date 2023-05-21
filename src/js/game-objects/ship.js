import GameObject from './game-object';
import BlasterShot from './weapons/blasterShot';
import Movement from '../processes/movement';
import { DEFAULT_SHIP_FUEL_LEVEL } from '../config';
import LevelLine from './ship-assets/level-line';

export default class Ship extends GameObject {
  constructor({
    position,
  } = {}) {
    const name = 'playerShip';
    const asset = 'assets/png/playerShip3_green.png';

    super({
      name, x: position.gameObject.x, y: position.gameObject.y,
    });

    this.fuel = DEFAULT_SHIP_FUEL_LEVEL;
    this.movement = new Movement({ obj: this, position });

    const shipWidth = 10;
    const shipHeight = 10;

    this.assets = {
      ship: new GameObject({ width: shipWidth, height: shipHeight, asset }),
      fuelLevel: new LevelLine({
        y: shipHeight,
      }),
    };

    this.addChild(this.assets.ship);
    this.addChild(this.assets.fuelLevel);
  }

  moveTo(target) {
    if (target === this.movement.position) {
      console.warn('Impossible to move to the same position');
      return;
    }
    this.movement.add(target);
  }

  hitByBlaster(target) {
    if (target === this.movement.position) {
      console.warn('Impossible to hit the same position');
      return;
    }
    this.scene.addChild(new BlasterShot(this.x, this.y, target));
  }
}
