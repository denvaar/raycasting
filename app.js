class Particle {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.rays = [];

    for (let a = 0; a < 360; a += 5) {
      this.rays.push(new Ray(this.position, radians(a)));
    }
  }

  update(x, y) {
    this.position.set(x, y);
  }

  show(walls) {
    for (let ray of this.rays) {
      let nearestWallDistance = Infinity;
      let nearestIntersect = null;

      for (let wall of walls) {
        const intersectionPoint = ray.lineSegmentIntersectPoint(
          wall[0].x,
          wall[0].y,
          wall[1].x,
          wall[1].y,
        );

        if (intersectionPoint) {
          const distance = p5.Vector.dist(this.position, intersectionPoint);

          if (distance < nearestWallDistance) {
            nearestWallDistance = distance;
            nearestIntersect = intersectionPoint;
          }
        }

        ellipse(this.position.x, this.position.y, 10);
      }

      if (nearestIntersect) {
        push();
        stroke(255, 255, 0);
        line(
          this.position.x,
          this.position.y,
          nearestIntersect.x,
          nearestIntersect.y,
        );
        pop();
      } else {
        ray.show();
      }
    }
  }
}

class Ray {
  constructor(pos, angle) {
    this.position = pos;
    this.direction = p5.Vector.fromAngle(angle, 100);
  }

  lineSegmentIntersectPoint(x1, y1, x2, y2) {
    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom === 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = (-1 * ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      const intersectionPoint = createVector();
      intersectionPoint.x = x1 + t * (x2 - x1);
      intersectionPoint.y = y1 + t * (y2 - y1);
      return intersectionPoint;
    }

    return null;
  }

  lineIntersectPoint(x1, y1, x2, y2) {
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
    stroke(255, 255, 0, 80);
    push();
    translate(this.position.x, this.position.y);
    line(0, 0, this.direction.x, this.direction.y);
    pop();
  }
}

let particle;
let walls;

function setup() {
  createCanvas(600, 400);
  particle = new Particle(width / 2, height / 2);
  setFrameRate(30);
  walls = [
    [createVector(150, 100), createVector(450, 350)],
    [createVector(100, 100), createVector(400, 350)],
    [createVector(350, 200), createVector(250, 350)],
    [createVector(100, 400), createVector(23, 250)],
    [createVector(200, 400), createVector(103, 250)],
  ];
}

function draw() {
  background(0);

  stroke(255);
  walls.forEach(wall => {
    line(wall[0].x, wall[0].y, wall[1].x, wall[1].y);
  });

  particle.update(mouseX - 20, mouseY - 20);
  particle.show(walls);
}
