//// Eyeris
//// Procedural Art
//// for a multi-colored
//// eye. by Ed Cavett

let shape;
function setup() {
  createCanvas(windowWidth, windowHeight);
  shape = new waver();
  background(0, 255);
}

function draw() {
  if (frameCount === 1) {
    capturer.start();
  }
  if (frameCount % 2000 === 0) {
    background(0, 255);
  }
  shape.make();
  push();
  stroke(25, 255);
  strokeWeight(5);
  fill(3, 255);
  let ps = map(noise(frameCount * 0.0005), 0, 1, 0.1, 0.5);
  // circle(width/2, height/2, height * ps)
  circle(width / 2, height / 2, 70);
  noFill();
  strokeWeight(150);
  stroke(0, 0, 0, 255);
  circle(width / 2, height / 2, height * 1.15);
  pop();
  if (frameCount < 1980) {
    capturer.capture(canvas);
  } else if (frameCount === 1980) {
    capturer.save();
    capturer.stop();
  }
}
function waver() {
  this.x = 0;
  this.y = 0;
  this.yoff = 0;
  this.s = 0;
  this.len = height * 0.78;
  this.theta = 0;
  this.ts = 0.009;
  this.r = floor(random(255));
  this.g = floor(random(255));
  this.b = floor(random(255));

  this.make = function () {
    let xoff = 0;
    this.s = map(noise(frameCount * 0.01), 0, 1, 10, 75);
    this.theta += this.ts;
    if (this.theta > 1) {
      this.theta = 0;
      this.colorer();
    }
    push();
    translate(width / 2, height / 2);
    rotate(TWO_PI * this.theta);
    stroke(this.r, this.g, this.b, 75);
    strokeWeight(7);
    noFill();
    beginShape();
    let sz = map(noise(frameCount * 0.1), 0, 1, 10, this.len);
    let rgap = map(noise(frameCount * 0.01), 0, 1, 3, 15);
    for (let x = 0; x < sz; x += rgap) {
      this.y = map(noise(xoff, this.yoff), 0, 1, -this.s, this.s);
      vertex(x, this.y);
      xoff += 0.05;
    }
    endShape();
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(-TWO_PI * this.theta);
    stroke(0, 200);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let x = 0; x < sz; x += rgap) {
      this.y = map(noise(xoff, this.yoff), 0, 1, -this.s, this.s);
      vertex(x, this.y);
      xoff += 0.05;
    }
    this.yoff += 0.01;
    endShape();
    pop();
  };
  this.colorer = function () {
    this.r += 24;
    if (this.r > 255) {
      this.r = 0;
      this.g += 24;
      if (this.g > 255) {
        this.g = 0;
        this.b += 24;
        if (this.b > 255) {
          this.b = 0;
        }
      }
    }
  };
}
