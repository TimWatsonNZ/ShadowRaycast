import { Line, LineUtil } from "./Line";
import Graphics from "./Graphics";
import Camera from "./Camera";
import Vector from "./vector";

class Polygon {
  lines: Line[];

  center: Vector;

  constructor(lines: Line[]) {
    this.lines = lines;
  }

  stroke(rotation: number, scale: number, translation: Vector, graphics: Graphics) {
    this.lines.map(line => 
      LineUtil.transform(line, scale, rotation, translation)
    ).forEach(line => LineUtil.draw(line, graphics));
  }

  fill(graphics: Graphics) {
    const { ctx } = graphics;
    ctx.beginPath();
    ctx.moveTo(this.lines[0].p1.x, this.lines[0].p1.y);
    
    for (let i=0;i < this.lines.length;i++) {
      ctx.lineTo(this.lines[i].p2.x, this.lines[i].p2.y);
    }
    ctx.closePath();
    ctx.fill();
  }
}

export default Polygon;