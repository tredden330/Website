var isFullScreen = false;
var gridX = 40;
var gridY = 20;
let player;
let fruits = [];
let gameSpeed = 10;

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  background(0);
  textSize(36);
  stroke(255);
  fill(255)
  text("click anywhere to begin", width/2, height/2);
  player = new Actor(2,2,0);

  for (let i = 0; i < 8; i++) {
    fruits.push(new Fruit(round(random(1,gridX)),round(random(1,gridY))));
    }
}

function draw() {
if (isFullScreen){
    background(0);
    frameRate(gameSpeed);
     for (let i = 0 ; i < width; i += width/gridX) {
        for (let j = 0 ; j < height; j += height/gridY) {
                fill(0);
                rect(i, j, width/gridX, height/gridY);
        }
       }
    
    player.show();
    player.checkCollision();
    player.move();
    player.updateHistory();
    player.checkSelfCollision();

    for (let i = 0; i < fruits.length; i++) {
      fruits[i].show();
    }

    stroke(255);
    fill(255);
    //text(mouseX + ", " + mouseY, width/2, height/2);
}
}

function mousePressed() {
    if (!isFullScreen) {
    isFullScreen = true;
    fullscreen(true);
    noCursor();
    } else {
        if (mouseY > 1100 && (mouseX > 350 && mouseX < 500 )) {
            player.dirX = 0;
            player.dirY = 1;
        } else if (mouseY < 1500 && (mouseX > 350 && mouseX < 500 )) {
            player.dirX = 0;
            player.dirY = -1;        
        } else if (mouseX > 350) {
            player.dirX = 1;
            player.dirY = 0;
        } else if (mouseX < 175) {
            player.dirX = -1;
            player.dirY = 0;        
        }
    if (!player.justAte) {
    player.updateHistory();
    }
   player.justAte = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            player.dirX = -1;
            player.dirY = 0;
            break;
        case RIGHT_ARROW:
            player.dirX = 1;
            player.dirY = 0;
            break;    
        case UP_ARROW:
            player.dirY = -1;
            player.dirX = 0;
            break;
        case DOWN_ARROW:
            player.dirY = 1;
            player.dirX = 0;
            break;      
    }
    if (!player.justAte) {
    player.updateHistory();
    }
   player.justAte = false;
}

class Actor {
    
    constructor(x_, y_, c_) {
       this.x = x_;
       this.y = y_; 
       this.c = c_;
       this.prevX = 0;
       this.prevY = 0;
       this.dirX = 0;
       this.dirY = 0;
       this.myColor = color(random(255),random(255),random(255));
       this.history = [];
       this.justAte = false;
    }
    move() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x += this.dirX;
      this.y += this.dirY;
      this.x = constrain(this.x, 0,gridX-1);
      this.y = constrain(this.y, 0,gridY-1);
    }
    show() {
       fill(this.myColor);
                 rect(this.x*width/gridX,this.y*height/gridY,width/gridX,height/gridY);
       if (this.history.length > 0) {
       for (let i = 0; i < this.history.length; i++) {
           fill(this.myColor);
           rect(this.history[i].x*width/gridX,this.history[i].y*height/gridY,width/gridX,height/gridY);
           fill(255);
       } 
       }
    }
    checkCollision() {
        for (let i = 0; i < fruits.length; i++) {
            if (this.x == fruits[i].x-1 && this.y == fruits[i].y-1) {
                this.myColor = fruits[i].fruitColor;
                fruits[i].randomize();
                this.history.push(createVector(this.history[this.history.length-1].x + this.dirX,this.history[this.history.length-1].y + this.dirY)); 
                this.justAte = true;
                //gameSpeed++;
                
            }
        }    
    }
    updateHistory() {
        for (let i = 0; i < this.history.length-1; i++) {
            this.history[i] = this.history[i+1];
        }
        this.history[this.history.length-1] = createVector(this.prevX, this.prevY);
    }
    checkSelfCollision() {
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].x == this.x && this.history[i].y == this.y) {
          noLoop();
          textSize(100);
          text("game over \n score: " + this.history.length, width/2, height/2);
          cursor();
        }
      }
        
    }

}

class Fruit {

    constructor(x_,y_) {
    this.x = x_;
    this.y = y_;
    this.fruitColor = color(random(255),random(255),random(255));
    this.girth = random(15, 40);
    this.prevX;
    this.prevY;
    }

    show() {
    fill(this.fruitColor);
    stroke(this.fruitColor);
    ellipse((this.x*width/gridX)-(width/gridX)/2,(this.y*height/gridY)-(height/gridY)/2,this.girth); 
    }

    randomize() {
    this.x = round(random(1,gridX));
    this.y = round(random(1,gridY));
    this.fruitColor = color(random(255),random(255),random(255));
    this.girth = random(15, 40);
    }

}

