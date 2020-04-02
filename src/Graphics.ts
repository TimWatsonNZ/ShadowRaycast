import Vector from "./vector";
import Camera from "./Camera";

class Graphics {
  ctx: CanvasRenderingContext2D;
  camera: Camera;

  fillStyles: string[] = [];
  strokeStyles: string[] = [];
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    
    const canvas = document.createElement('canvas');
    canvas.height = this.height;
    canvas.width = this.width;

    const ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    this.ctx = ctx;
    this.fillStyles = [];
    this.strokeStyles = [];

    this.camera = new Camera(12, 100, 1600);
  }

  drawCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.stroke();
  }

  strokeCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.stroke();
  }

  fillCircle(point: Vector, radius: number) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2*Math.PI);
    ctx.fill();
  }

  pushFillStyle(style: string) {
    this.fillStyles.push(style);
    this.ctx.fillStyle = style;
  }

  popFillStyle() {
    const style = this.fillStyles.pop();
    if (!style) {
      this.ctx.fillStyle = '#000000';
    } else {
      this.ctx.fillStyle = style
    }
  }

  pushStrokeStyle(style: string) {
    this.strokeStyles.push(style);
    this.ctx.strokeStyle = style;
  }

  popStrokeStyle() {
    const style = this.strokeStyles.pop();
    if (!style) {
      this.ctx.strokeStyle = '#000000';
    } else {
      this.ctx.strokeStyle = style
    }
  }
}

export default Graphics;