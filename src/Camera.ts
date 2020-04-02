class Camera {
  rayCount: number;
  height: number;
  horizon: number;

  constructor(rayCount: number, height: number, horizon: number) {
    this.rayCount = rayCount;
    this.height = height;
    this.horizon = horizon;
  }
}

export default Camera;