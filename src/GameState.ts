import Player from "./Player";

export class GameState {
  player: Player;
  delta: number;

  running: boolean;


  constructor(player: Player) {
    this.player = player;

    this.delta = 0;
    this.running = false;
  }
}
