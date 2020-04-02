import { GameState } from "./GameState";
import Graphics from "./Graphics";
import Player from "./Player";
import Vector from "./vector";
import { inputController } from './InputController'

import Level from "./Level";
import { Line, LineUtil } from "./Line";
import Raymarcher from "./Raymarcher";

const player = new Player(new Vector(166, 166));
const state = new GameState(player);
const graphics = new Graphics(800, 600);


const level = new Level([
  LineUtil.create(300, 20, 300, 40),
  LineUtil.create(300, 60, 300, 100),
  LineUtil.create(300, 120, 300, 160),
  LineUtil.create(300, 180, 300, 220),

  LineUtil.create(500, 30, 500, 50),
  LineUtil.create(500, 60, 500, 110),
  LineUtil.create(500, 130, 500, 170),
  LineUtil.create(500, 190, 500, 230),
]);

inputController.subscribe(player);

let prevTimestamp = new Date();
const sleep = 20;

//  Draw view fustrum.
const marcher = new Raymarcher(graphics.camera);


function loop() {
  const currentTimestamp = new Date();
  const delta = (currentTimestamp.getTime() - prevTimestamp.getTime())/ 1000;

  state.delta = delta;
  prevTimestamp = currentTimestamp;
  
  player.update(state);
  player.draw(graphics);

  marcher.render(level, graphics, player.position, player.orientation);
  

}

window.setInterval(loop, sleep);