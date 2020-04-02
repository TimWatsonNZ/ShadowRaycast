interface IKeyState {
  w: boolean,
  s: boolean,
  a: boolean,
  d: boolean
}

interface IHandlesInput {
  handleInput(activeKeys: IKeyState): void;
}

class InputController {
  keyState: IKeyState;
  subscribers: IHandlesInput[];

  constructor() {
    this.keyState = {
      w: false, a: false, s: false, d: false
    }
    this.subscribers = [];
  }

  subscribe(e: IHandlesInput) {
    this.subscribers.push(e);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'w') {
      this.keyState.w = true;
    }
    if (event.key === 's') {
      this.keyState.s = true;
    }
    if (event.key === 'a') {
      this.keyState.a = true;
    }
    if (event.key === 'd') {
      this.keyState.d = true;
    }

    this.subscribers.forEach(s => s.handleInput(this.keyState));
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'w') {
      this.keyState.w = false;
    }
    if (event.key === 's') {
      this.keyState.s = false;
    }
    if (event.key === 'a') {
      this.keyState.a = false;
    }
    if (event.key === 'd') {
      this.keyState.d = false;
    }
    this.subscribers.forEach(s => s.handleInput(this.keyState));
  }
}

const inputController = new InputController();

window.addEventListener('keydown', inputController.handleKeyDown.bind(inputController));

window.addEventListener('keyup', inputController.handleKeyUp.bind(inputController));


export { inputController, IKeyState, IHandlesInput }