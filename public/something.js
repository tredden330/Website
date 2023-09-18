var socket
var fs
var mousePos = {x : 0, y : 0}
let history = new Array(0)
var col;
var strokeWt;

function setup() {
    createCanvas(600,600)
    textSize(30);
    textAlign(CENTER, CENTER)
    
    socket = io.connect('http://24.91.29.105:4444')
    socket.on('mouse', newLine = (data) => history.push(data))
    socket.on('mousePos', updateMousePos)
    socket.on('clear', clearHistory = (data) => history = [])

    fs = false;
    history = [];
    strokeWt = 5;
    
    col = color(255,255,255);
}

function draw() {
if (fs) {
background(0);

sendMousePos();

drawHistory();

noFill()
strokeWeight(1);
ellipse(mousePos.x, mousePos.y, 20)

if (mouseIsPressed) {
    stroke(col)
    line(pmouseX,pmouseY,mouseX,mouseY)

    var data = {
        px : pmouseX,
        py : pmouseY,
        x : mouseX,
        y : mouseY,
        r : red(col),
        g : green(col),
        b : blue(col),
        strWeight : strokeWt
        }
    history.push(data)
    socket.emit("mouse", data)
    }
}
else {
background(0);
fill(255);
text("press f to go fullscreen and draw", width/2, height/2);
}
}

function keyPressed() {
    console.log(keyCode)
    switch (keyCode) {
        case 70:
           fs = !fs;
           fullscreen(fs);
           break;
        case 67:
            var clear = 1;
            history = [];
            socket.emit("clear", clear);
            break;
        case 82:
            col = color(255,0,0);
            break;
        case 71:
            col = color(0,255,0);
            break;
        case 66:
            col = color(0,0,255);
            break;
        case 87:
            col = color(255,255,255);
            break;
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateMousePos(data) {
    mousePos = {
        x : data.x,
        y : data.y
    }
}

function sendMousePos() {
var mousePosition = {
    x : mouseX,
    y : mouseY
}
socket.emit("mousePos", mousePosition)
}

function drawHistory() {
    for (const element of history) {
    stroke(color(element.r, element.g, element.b))
    strokeWeight(element.strWeight);
    line(element.px, element.py, element.x, element.y)
    }
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  strokeWt -= floor(event.delta/166);
  strokeWt = constrain(strokeWt, 1 , 40)
}
