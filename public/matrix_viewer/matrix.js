
function setup(){

    createCanvas(windowWidth, windowHeight)

    cloud = new pointCloud(20,20)
    transformationMatrix = [1, 1,
                            2, 1]
    cloud.apply2dMatrix(transformationMatrix)
}

function draw(){

    //clear background
    background(0)

    changeLook(150, 0.05, false)
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            line(i*width/20, 0, i*width/20, height)
            line(0, j*height/20, width, j*height/20)
        }
    }

    
    changeLook(255, 2, false)
    line(0, height/2, width, height/2)
    line(width/2, 0, width/2, height)

//    cloud.showOld()
    push()
    translate(width/2, height/2)
    cloud.showAnimation()
    pop()

    fill(150)
    strokeWeight(0.01)
    textSize(20)
    text("current transformation matrix: ", width*2/3, height/4)
    text(transformationMatrix[0], width*2/3+40, height/4+40)
    text(transformationMatrix[1], width*2/3+80, height/4+40)
    text(transformationMatrix[2], width*2/3+40, height/4+80)
    text(transformationMatrix[3], width*2/3+80, height/4+80)
}

function mousePressed() {
    if (dist(mouseX,mouseY,width*2/3+40,height/4+40) < 20) {
        console.log("you are epic")
    }
}

function changeLook(col, weight, fil){
    stroke(col)
    strokeWeight(weight)
    if (fil !== false) {
        fill(fil)
    } else {
        noFill()
    }
}

class pointCloud {

    constructor(x, y){
        this.x = x
        this.y = y
        this.vectors = []
        for (var i = -20; i < this.x; i++) {
             for (var j = -20; j < this.y; j++){
                   this.vectors.push(createVector(i*width/this.x, j*height/this.y))
             }
        }
    }

    showOld() {
        stroke(255)
        strokeWeight(5)
        for (var i = 0; i < this.vectors.length; i++) {
             point(this.vectors[i].x, this.vectors[i].y)
        }
    }

    showNew() {
        stroke(255)
        strokeWeight(5)
        for (var i = 0; i < this.vectors.length; i++) {
             point(this.newVectors[i].x, this.newVectors[i].y)
        }
    }

    apply2dMatrix(matrix){
        this.newVectors = []
        for (var i = 0; i < this.vectors.length; i++) {
            this.newVectors.push(createVector(matrix[0]*this.vectors[i].x + matrix[1]*this.vectors[i].y, matrix[2]*this.vectors[i].x + matrix[3]*this.vectors[i].y))
        }
    }

    showAnimation(){
        stroke(255)
        strokeWeight(5)
        for (var i = 0; i < this.vectors.length; i++) {
             this.lerpedVector = p5.Vector.lerp(this.vectors[i], this.newVectors[i], map(sin(millis()/1000), -1, 1, 0, 1))
             point(this.lerpedVector.x, this.lerpedVector.y)
        }
    }
}
