let bool = true;
let t = 0;
let wall = [];
let img
let y = 0;
let failCount = 0;
let fs = false;

function setup() {
  c = createCanvas(1000, 1000, WEBGL);
  for (i = 0; i < 200; i++) {
    wall[i] = new RectPrism(100, 20, -100);
  }
    player1 = new actor(-150, -25, 3750);
}

function draw() {
  background(0);
  push();
  translate(100, 200, 0);
  for (i = 0; i < wall.length; i++) {
    if (i % 5 == 0) {
      wall[i].rowShift();
    } else {
      wall[i].append();
    }
    wall[i].show();
  }
  pop();
  push();
  player1.march();
  player1.slide();
  player1.fall();
  player1.show();
  player1.tileLog()
  pop();
  camera(-50, 0, 500 - t * 5, 0, 0, -100000, 0, 1, 0);
 // print(wall[player1.tileLog()].bool)
  if (player1.y > 100) {
      camera(-50, 0, 500, 0, 0, -100000, 0, 1, 0);
    t = 0;
    player1.reset();
    failCount++;
    y = 0;
  }
    y++;
}
function mousePressed() {
          if (player1.y > -26 && wall[player1.tileLog()].bool && mouseY < height/2) {
              player1.jump();
      }
}
function keyPressed() {
  if (key === 'w') {
      if (player1.y > -26 && wall[player1.tileLog()].bool) {
              player1.jump();
      }

  
  }
  if (keyCode === SHIFT) {
    camera(-50, 0, 500, 0, 0, -100000, 0, 1, 0);
    t = 0;
    player1.reset();
  }
}

class RectPrism {
  constructor(x, y, z, rand) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.bool = false;
    this.rand = random(5);
  }

  rowShift() {
    push();
    translate(-400, 0, -100);
  }

  append() {
    translate(100, 0, 0);
    if (wall[i].rand < 2.5 && i > 10) {
      noFill();
      noStroke();
      wall[i].setBool(false)
    } else {
      stroke(0);
      fill(255);
      wall[i].setBool(true)
    }
  }
  
  setBool(answer) {
    this.bool = answer
  }

  show() {
    beginShape();
    vertex(0, 0, 0);
    vertex(0, this.y, 0);
    vertex(this.x, this.y, 0);
    vertex(this.x, 0, 0);
    vertex(0, 0, 0);
    endShape();
    push();
    translate(0, 0, this.z);
    beginShape();
    vertex(0, 0, 0);
    vertex(0, this.y, 0);
    vertex(this.x, this.y, 0);
    vertex(this.x, 0, 0);
    vertex(0, 0, 0);
    endShape();
    pop();
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, this.z);
    vertex(this.x, 0, this.z);
    vertex(this.x, 0, 0);
    vertex(0, 0, 0);
    endShape();
    push();
    translate(0, this.y, 0);
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, this.z);
    vertex(this.x, 0, this.z);
    vertex(this.x, 0, 0);
    vertex(0, 0, 0);
    endShape();
    pop();
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, this.z);
    vertex(0, this.y, this.z);
    vertex(0, this.y, 0);
    vertex(0, 0, 0);
    endShape();
    push();
    translate(this.x, 0, 0);
    beginShape();
    vertex(0, 0, 0);
    vertex(0, 0, this.z);
    vertex(0, this.y, this.z);
    vertex(0, this.y, 0);
    vertex(0, 0, 0);
    endShape();
    pop();

    t += 0.005;
  }
}
class actor {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.velY = 0;
    this.accY = 0;
    this.tileX = 3
    this.tileZ = 0
    this.tileBelowIndex = 2
  }

  reset() {
    this.x = -150;
    this.y = -25;
    this.z = 3750;
    if (failCount = 2) {
        
     
    }
  }
  march() {
    this.z -= 5;
  }

  slide() {
    if (keyIsDown(65) || (mouseIsPressed && mouseX < width/2 && mouseY > height/2)) {
      this.x -= 7;
    }
    if (keyIsDown(68) || (mouseIsPressed && mouseX > width/2 && mouseY > height/2)) {
      this.x += 7;
    }
  }


  fall() {
    this.y += this.velY;
    this.velY += this.accY;
    if (this.y > -25 && wall[player1.tileLog()].bool) {
      this.y = -25;
      this.velY = 0
      this.accY = 0
    }
    else {
      this.accY = 1
    }
  }

  jump() {
    this.velY = -20;
  }

  show() {
    stroke(100);
    fill(255);
    translate(this.x, this.y, this.z);
    sphere(30);
  }
  
  tileLog() {
    if (-400 < this.x && this.x < -300) {
      this.tileX = 0
    }
    if (-300 < this.x && this.x < -200) {
      this.tileX = 1
    }
        if (-200 < this.x && this.x < -100) {
      this.tileX = 2
    }
        if (-100 < this.x && this.x < 0) {
      this.tileX = 3
    }
        if (0 < this.x && this.x < 100) {
      this.tileX = 4
    }
    for (i = 0; i < wall.length / 5; i++) {
      if (3700- (i * 100) < this.z && this.z < 3800 - (i * 100)) {
        this.tileZ = i
      }
    }
    this.tileBelowIndex = 5 * this.tileZ + this.tileX
    return this.tileBelowIndex
  }
}
