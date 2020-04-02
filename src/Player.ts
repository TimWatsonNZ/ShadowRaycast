import Vector from "./vector";
import { IHandlesInput, IKeyState } from "./InputController";
import Graphics from "./Graphics";
import { GameState } from "./GameState";

enum Turning {
  None,
  Left,
  Right
}

enum Motion {
  None, Forward, Backward
}

export default class Player implements IHandlesInput {
  position: Vector;
  motion: Motion;
  turning: Turning;
  velocity: Vector;
  orientation: Vector;
  turnRate: number;
  breakRate: number;
  maxSpeed: number;
  acceleration: number;
  radius: number;

  constructor(position: Vector) {
    this.position = position;

    this.motion = Motion.None;
    this.turning = Turning.None;
    this.orientation = new Vector(0, -1);
    this.velocity = new Vector(0, 0);
    this.turnRate = 2*Math.PI;

    this.turning = Turning.None;
    this.motion = Motion.None;

    this.acceleration = 200;
    this.breakRate = 100;
    this.maxSpeed = 100;
    this.radius = 12;
  }

  draw(graphics: Graphics) {
    // graphics.drawCircle(this.position, 10);
  }
  
  update(state: GameState) {
    if (this.velocity.magnitude() > 0) {
      if (this.motion !== Motion.None) {
        this.velocity = this.velocity.add(this.velocity.normalise().scale(-this.breakRate * state.delta));
      } else {
        this.velocity = this.velocity.add(this.velocity.normalise().scale(2 * -this.breakRate * state.delta));
      }

      if (this.velocity.magnitude() < 0.02) {
        this.velocity = this.velocity.clamp(0);
      }
    }

    if (this.turning === Turning.Left) {
      this.orientation = this.orientation.rotate(-1 * this.turnRate * state.delta);
    }
    if (this.turning === Turning.Right) {
      this.orientation = this.orientation.rotate(this.turnRate * state.delta);
    }

    if (this.motion == Motion.Forward) {
      this.velocity = this.velocity.add(this.orientation.scale(this.acceleration * state.delta));
    }

    if (this.motion == Motion.Backward) {
      this.velocity = this.velocity.add(this.orientation.scale(-this.acceleration * state.delta));
    }

    this.velocity = this.velocity.clamp(this.maxSpeed);
    this.position = this.position.add(this.velocity.scale(state.delta));
  }

  handleInput(keyState: IKeyState) {
    if (keyState.w) {
      this.motion = Motion.Forward;
    } else if (keyState.s) {
      this.motion = Motion.Backward;
    } else {
      this.motion = Motion.None;
    }

    if (keyState.a) {
      this.turning = Turning.Left;
    } else if (keyState.d) {
      this.turning = Turning.Right;
    } else {
      this.turning = Turning.None;
    }
  }

  forward() {
    this.motion = Motion.Forward;
  }

  backward(){
    this.motion = Motion.Backward;
  }

  noMotion() {
    this.motion = Motion.None;
  }

  turnLeft() {
    this.turning = Turning.Left;
  }

  turnRight() {
    this.turning = Turning.Right;
  }

  noTurn() {
    this.turning = Turning.None;
  }
}