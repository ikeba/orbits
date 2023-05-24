import { ref } from '@vue/reactivity';
import { watch } from '@vue-reactivity/watch';

import GameObject from './game-object';
import BlasterShot from './weapons/blasterShot';
import Movement from '../processes/movement';
import LevelLine from './ship-assets/level-line';
import Asteroid from './asteroid';

import { DEFAULT_SHIP_FUEL_LEVEL, DefaultGameObjectNames } from '../config';

export type ShipAssets = {
  ship: GameObject,
  fuelLevel: LevelLine,
}
export default class Ship extends GameObject {
  fuel = DEFAULT_SHIP_FUEL_LEVEL;
  // this means that the ship consumes <fuelConsumption>(1) fuel per 1 pixel of distance
  fuelConsumption = 1;
  assets: ShipAssets;
  movement: Movement;

  constructor({
    position = null,
  } = {}) {
    super({
      name: DefaultGameObjectNames.PlayerShip,
      x: position.gameObject.x,
      y: position.gameObject.y,
    });

    this.movement = new Movement({ obj: this, position });

    const shipWidth = 10;
    const shipHeight = 10;

    this.assets = {
      ship: new GameObject({ width: shipWidth, height: shipHeight, asset: 'assets/img/playerShip.png' }),
      fuelLevel: new LevelLine({
        y: shipHeight,
      }),
    };

    this.addChild(this.assets.ship);
    this.addChild(this.assets.fuelLevel);

    watch(this.movement.position, () => this.onPositionChange());
  }

  private onPositionChange() {
    if (this.movement.position !== null) {
      this.assets.ship.turnToDefaultAngle();
    }
  }

  private isEnoughFuel(target: Asteroid) {
    return this.fuel > this.movement.getDistanceToTargetFromTheLastQueuePoint(target) * this.fuelConsumption + this.movement.totalDistanceForTheQueue * this.fuelConsumption;
  }

  private consumeFuel(target: Asteroid) {
    this.fuel -= this.movement.getDistanceToTargetFromTheLastQueuePoint(target) * this.fuelConsumption;
    const fuelLevel = (this.fuel / DEFAULT_SHIP_FUEL_LEVEL) * 100;
    this.assets.fuelLevel.changeFuelLevel(fuelLevel);
    console.log(`FUEL LEFT: ${fuelLevel}%`);
  }

  /**
   * Main move function.
   * @param target
   */
  moveTo(target: Asteroid) {
    if (target === this.movement.position.value) {
      console.warn('Impossible to move to the same position');
      return;
    }

    if (!this.isEnoughFuel(target)) {
      console.warn('Not enough fuel');
      return;
    }

    this.consumeFuel(target);

    this.movement.add(target);
  }

  hitByBlaster(target: Asteroid) {
    if (target === this.movement.position.value) {
      console.warn('Impossible to hit the same position');
      return;
    }
    this.scene.addChild(new BlasterShot(this.x, this.y, target));
  }
}
