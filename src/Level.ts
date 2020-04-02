import { Line } from "./Line";

class Level {
  geometry: Line[];

  constructor(geometry: Line[]) {
    this.geometry = geometry;
  }
}

export default Level;