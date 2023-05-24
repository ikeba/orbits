import * as PIXI from 'pixi.js';

import { watch } from '@vue-reactivity/watch';

import GameObject from './game-object';
import BlasterShot from './weapons/blasterShot';
import Movement from '../processes/movement';
import LevelLine from './ship-assets/level-line';
import Asteroid from './asteroid';

import {
  DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT,
  DEFAULT_SHIP_FUEL_LEVEL,
  DefaultGameObjectNames,
} from '../config';

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

  fuelAcquire: {
    ticker: PIXI.Ticker,
    elapsed: number,
  } = {
      ticker: null,
      elapsed: 0,
    };

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
        y: shipHeight * 0.75,
      }),
    };

    this.addChild(this.assets.ship);
    this.addChild(this.assets.fuelLevel);

    watch(this.movement.position, () => this.onPositionChange());
  }

  private onPositionChange() {
    if (this.movement.position.value !== null) {
      this.assets.ship.turnToDefaultAngle();
      // @todo: add more abstraction for the ticker
      this.fuelAcquire.ticker = new PIXI.Ticker();
      this.fuelAcquire.ticker.add((delta) => this.acquireFuel(delta));
      this.fuelAcquire.ticker.start();
    } else {
      // this.app.ticker.remove(this.acquireFuel);
    }
  }

  private acquireFuel(deltaTime) {
    if (this.movement.position.value === null) {
      // @todo: add reset() function to the ticker
      this.fuelAcquire.ticker.destroy();
      this.fuelAcquire.elapsed = 0;
      return;
    }

    this.fuelAcquire.elapsed += (1 / 60) * deltaTime;

    if (this.fuelAcquire.elapsed > 1) {
      this.fuelAcquire.elapsed = 0;
      const asteroid = this.movement.position.value;
      if (asteroid.energy >= DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT && this.fuel <= (DEFAULT_SHIP_FUEL_LEVEL - DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT)) {
        console.log('Asteroid energy', asteroid.energy);
        console.log('Ship fuel level', this.fuel);
        asteroid.consumeEnergy(DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT);
        this.fuel += DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT;
        this.assets.fuelLevel.changeLevel(this.fuel, DEFAULT_SHIP_FUEL_LEVEL);
      }
    }
  }

  private isEnoughFuel(target: Asteroid) {
    return this.fuel > this.movement.getDistanceToTargetFromTheLastQueuePoint(target) * this.fuelConsumption + this.movement.totalDistanceForTheQueue * this.fuelConsumption;
  }

  private consumeFuel(target: Asteroid) {
    this.fuel -= this.movement.getDistanceToTargetFromTheLastQueuePoint(target) * this.fuelConsumption;
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
