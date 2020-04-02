
export default class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalise(): Vector {
    const { x, y } = this;
    let mag = Math.sqrt(x*x + y*y);
    mag = mag > 0 ? mag : 1;
    return new Vector(x / mag, y / mag);
  }

  distance(other: Vector) {
    return Math.sqrt(this.distanceSquared(other));
  }

  distanceSquared(other: Vector) {
    return Math.pow(this.x-other.x, 2) + Math.pow(this.y - other.y, 2);
  }

  scale(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  clamp(num: number): Vector {
    const mag = this.magnitude();
    const scale = mag > num ? num / mag : 1;
    
    return this.scale(scale);
  }

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(vector: Vector): Vector {
    return new Vector(this.x * vector.x, this.y * vector.y);
  }

  distanceToLine(point1: Vector, point2: Vector) {
    const dist = point1.distance(point2);
    const a = (point2.y - point1.y) * this.x;
    const b = (point2.x - point1.x) * this.y;
    const c = point2.x*point1.y;
    const d = point2.y*point1.x;

    return (a - b + c - d) / dist;
  }

  magnitude(): number {
    return Math.sqrt(this.x*this.x + this.y * this.y);
  }

  sign(): number {
    return this.x * this.y > 0 ? 1 : -1;
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  crossScalar(vector: Vector): number {
    return this.x * vector.y - this.y * vector.x;
  }

  angleBetween(vector: Vector): number {
    const dot = this.dot(vector);
    const magProduct = (this.magnitude() * vector.magnitude()) || 1;
    if (Math.abs(dot/magProduct) > 1) {
      return 0;
    }
    return Math.acos(dot/magProduct);
  }

  toAngle() {
    const referenceVector = new Vector(0, -1);
    const crossScalar = this.crossScalar(referenceVector);
    return crossScalar > 0 ? -1 * this.angleBetween(referenceVector) : this.angleBetween(referenceVector);
  }

  rotate(angle: number): Vector {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return new Vector(x, y);
  }

  rotateAroundPoint(angle: number, point: Vector): Vector {
    const translatedX = this.x - point.x;
    const translatedY = this.y - point.y;

    const rotated = new Vector(translatedX, translatedY).rotate(angle);

    return rotated.add(point);
  }

  signedMagnitude(): number {
    const mag = this.magnitude();
    const sign = this.sign();
    return mag * sign;
  }

  normal(): Vector {
    return new Vector(-this.y, this.x);
  }

  tween(toVector: Vector, scale: number): Vector {
    const diff = toVector.subtract(this);

    return this.add(diff.scale(scale));
  }

  equals(other: Vector) {
    return this.x === other.x && this.y === other.y;
  }
}