import * as PIXI from 'pixi.js';
import times from 'lodash/times';
import random from 'lodash/random';
import Asteroid from './game-objects/asteroid';
import Ship from './game-objects/ship';
import { FIELD_SIZE, ASTEROIDS_COUNT, CANVAS_SCALING } from './config';
import Scene from './game-objects/scene';

const view: HTMLElement = document.querySelector('#scene');

const app = new PIXI.Application({
  width: FIELD_SIZE,
  height: FIELD_SIZE,
  backgroundColor: 0x000000,
  // @ts-ignore
  view,
  resolution: window.devicePixelRatio || 1,
});

view.style.width = `${FIELD_SIZE / CANVAS_SCALING}px`;
view.style.height = `${FIELD_SIZE / CANVAS_SCALING}px`;

const scene = new Scene(app);

const asteroids = [];

times(ASTEROIDS_COUNT, () => {
  asteroids.push(new Asteroid());
});

const position = asteroids[random(0, ASTEROIDS_COUNT - 1)];

const ship = new Ship({ position });

asteroids.map((asteroid) => scene.addChild(asteroid));
scene.addChild(ship);

(window as any).scene = scene;
