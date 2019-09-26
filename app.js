class Particle {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.rays = [];

    for (let a = 0; a < 360; a += 2) {
      this.rays.push(new Ray(this.position, radians(a)));
    }
  }

  update(x, y) {
    this.position.set(x, y);
  }

  show(boundX1, boundY1, boundX2, boundY2) {
    for (let ray of this.rays) {
      const intersectionPoint = ray.intersectsWith(
        boundX1,
        boundY1,
        boundX2,
        boundY2,
      );

      if (intersectionPoint) {
        push();
        stroke(100);
        line(
          this.position.x,
          this.position.y,
          intersectionPoint.x,
          intersectionPoint.y,
        );
        pop();
      }

      ellipse(this.position.x, this.position.y, 10);
    }
  }
}

class Ray {
  constructor(pos, angle) {
    this.position = pos;
    this.direction = p5.Vector.fromAngle(angle);
  }

  intersectsWith(x1, y1, x2, y2) {
    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom === 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = (-1 * ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))) / denom;

    if (t > 0 && t < 1 && u > 0) {
      const intersectionPoint = createVector();
      intersectionPoint.x = x1 + t * (x2 - x1);
      intersectionPoint.y = y1 + t * (y2 - y1);
      return intersectionPoint;
    }

    return null;
  }

  show() {
    stroke(255);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x * 10, this.direction.y * 10);
    pop();
  }
}

let particle;

function setup() {
  createCanvas(600, 400);
  particle = new Particle(width / 2, height / 2);
}

function draw() {
  background(0);

  stroke(255);
  const wall = [createVector(350, 200), createVector(250, 350)];
  line(wall[0].x, wall[0].y, wall[1].x, wall[1].y);

  particle.update(mouseX, mouseY);
  particle.show(wall[0].x, wall[0].y, wall[1].x, wall[1].y);
}
