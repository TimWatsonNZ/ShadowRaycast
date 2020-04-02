import Vector from "./vector";
import Level from "./Level";
import { LineUtil } from "./Line";
import Graphics from "./Graphics";
import Camera from "./Camera";
import Polygon from "./Polygon";

class Raymarcher {
  rays: Vector[];
  horizonDistance = 800;
  epsilon = 0.1;
  camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
    this.rays = [];
  }

  marchRays(level: Level, origin: Vector) {
    return this.rays.map(ray => this.marchRay(ray, level, origin));
  }

  marchRay(direction: Vector, level: Level, origin: Vector) {
    let totalDistance = 0;
    let marchPoint = origin;
    let closestLine;
    while (true) {
      const distances = level.geometry.map(line => {
        return { distance: LineUtil.distanceFromPoint(marchPoint, line), line };
      });

      const leastDistance = distances.reduce((smallest, current, index) => {
        if (current.distance < smallest.distance) {
          return { index, distance: current.distance, line: current.line };
        } else {
          return smallest;
        }
      }, { index: 0, distance: Number.MAX_VALUE, line: undefined });

      totalDistance += leastDistance.distance;
      
      if (leastDistance.distance <= this.epsilon || leastDistance.distance >= this.horizonDistance) {
        break;
      }

      closestLine = leastDistance.line;
      marchPoint = direction.scale(leastDistance.distance).add(marchPoint);
    }

    return marchPoint;
  }

  render(level: Level, graphics: Graphics, origin: Vector, orientation: Vector) {
    this.rays = [];
    for (let i=0;i<level.geometry.length;i++) {
      this.rays.push(level.geometry[i].p1.subtract(origin).normalise().rotate(2*Math.PI/1800));
      this.rays.push(level.geometry[i].p1.subtract(origin).normalise().rotate(-2*Math.PI/1800));

      this.rays.push(level.geometry[i].p2.subtract(origin).normalise().rotate(2*Math.PI/1800));
      this.rays.push(level.geometry[i].p2.subtract(origin).normalise().rotate(-2*Math.PI/1800));
    }

    this.rays.push(new Vector(0,0).subtract(origin).normalise());
    this.rays.push(new Vector(graphics.width, 0).subtract(origin).normalise());
    this.rays.push(new Vector(0, graphics.height).subtract(origin).normalise());
    this.rays.push(new Vector(graphics.width, graphics.height).subtract(origin).normalise());

    this.rays = this.rays.sort((a,b) => a.toAngle() - b.toAngle());

    const rays = this.marchRays(level, origin);

    graphics.pushFillStyle('#000000');
    graphics.ctx.fillRect(0, 0, graphics.width, graphics.height);
    graphics.popFillStyle();

    graphics.ctx.fillRect(0, 0, 800, 600);
    graphics.pushStrokeStyle('#000000');
    graphics.ctx.strokeRect(0, 0, 800, 600);
    graphics.popFillStyle();
    graphics.popStrokeStyle();

    graphics.pushFillStyle('#FF0000');
    const playerPosition = origin;
    graphics.fillCircle(playerPosition, 2);
    graphics.popFillStyle();

    level.geometry.forEach((line, i) => {
      graphics.pushStrokeStyle('#00FF00');

      const transformedLine = { 
        p1: line.p1,
        p2: line.p2,
      }
      LineUtil.draw(transformedLine, graphics);
      
      graphics.popStrokeStyle();
    });

    graphics.popStrokeStyle();

    graphics.pushStrokeStyle('rgba(255,255,255, 0.8)');
    graphics.pushFillStyle('rgba(255,255,255, 0.8)');

    for (let i=0;i<rays.length;i++) {
      LineUtil.draw({ p1: origin, p2: rays[i] }, graphics);
      if (i < rays.length - 1) {
        const p = new Polygon([
          { p1: origin, p2: rays[i] },
          { p1: rays[i], p2: rays[i+1] },
          { p1: rays[i+1], p2: origin }
        ]);

        p.fill(graphics);
      } else {
        const p = new Polygon([
          { p1: origin, p2: rays[i] },
          { p1: rays[i], p2: rays[0] },
          { p1: rays[0], p2: origin }
        ]);

        p.fill(graphics);
      }
    }
  }
}

export default Raymarcher;