// @todo: temporary solution
export const CANVAS_SCALING = 1.5;
export const UI_SCALE = 1;
export const FIELD_SIZE = 1000 * UI_SCALE;
export const SHIP_SIZE = 40 * UI_SCALE;
export const ASTEROID_SIZE = 15 * UI_SCALE;

export const DEFAULT_LEVEL_LINE_WIDTH = 70 * UI_SCALE;
export const DEFAULT_LEVEL_LINE_HEIGHT = 5 * UI_SCALE;
export const DEFAULT_SHIP_SPEED = 150 * UI_SCALE;
export const BOUNDS = 25;
export const ASTEROIDS_COUNT = 20;

export const DEFAULT_ASTEROID_ENERGY_LEVEL = 100;
export const DEFAULT_SHIP_FUEL_LEVEL = 1000;

/**
 * // @todo: add abstraction over 'second'
 * How much fuel the ship can acquire per second.
 */
export const DEFAULT_SHIP_FUEL_ACQUIRE_AMOUNT = 5;

// eslint-disable-next-line no-shadow
export enum DefaultGameObjectNames {
  PlayerShip = 'PlayerShip',
}

export enum PossibleGameObjectTypes {
  Container = 'Container',
  Sprite = 'Sprite',
  Graphics = 'Graphics',
  Text = 'Text',
}
