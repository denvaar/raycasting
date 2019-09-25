class Ray {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.direction = createVector(1, 0);
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction.normalize();
  }

  intersectsWith(x1, y1, x2, y2) {
    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom === 0) return -1;

    const t = (x1 - x3) * (y3 - y4) - ((y1 - y3) * (x3 - x4)) / denom;
    const u = (-1 * ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))) / denom;

    if (t > 0 && t < 1 && u > 0) {
      return 1;
    }

    return -1;
  }

  show() {
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x * 100, this.direction.y * 100);
    pop();
  }
}

let ray;

function setup() {
  createCanvas(600, 400);
  ray = new Ray(width / 2, height / 2);
}

function draw() {
  background(0);

  stroke(255);
  const wall = [createVector(350, 100), createVector(350, 350)];
  line(wall[0].x, wall[0].y, wall[1].x, wall[1].y);

  ray.lookAt(mouseX, mouseY);
  ray.show();
  if (ray.intersectsWith(wall[0].x, wall[0].y, wall[1].x, wall[1].y) > 0) {
  }
}
