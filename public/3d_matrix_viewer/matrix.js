
function setup(){

    createCanvas(windowWidth, windowHeight, WEBGL)

    cloud = new pointCloud(5,5,5)
    transformationMatrix = [0, 1, 0,
                            0, 0, 1,
                            1, 0, 0]
    cloud.apply2dMatrix(transformationMatrix)
}

function draw(){

    orbitControl()
    //clear background
    background(0)
    stroke(255)
    line(-cloud.spacing, -cloud.spacing, -cloud.spacing, cloud.spacing,-cloud.spacing,-cloud.spacing)
    line(-cloud.spacing, -cloud.spacing, -cloud.spacing, -cloud.spacing,cloud.spacing,-cloud.spacing)
    line(-cloud.spacing, -cloud.spacing, -cloud.spacing, -cloud.spacing,-cloud.spacing,cloud.spacing)

    line(cloud.spacing, cloud.spacing, cloud.spacing, cloud.spacing,-cloud.spacing,cloud.spacing)
    line(cloud.spacing,-cloud.spacing,cloud.spacing, cloud.spacing, -cloud.spacing, -cloud.spacing)
    line(cloud.spacing, -cloud.spacing, -cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing)

    line(cloud.spacing,cloud.spacing,-cloud.spacing, cloud.spacing,cloud.spacing,cloud.spacing)
    line(cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing,cloud.spacing,cloud.spacing)
    line(-cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing,cloud.spacing,-cloud.spacing)
    line(-cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing,-cloud.spacing,cloud.spacing)

    line(-cloud.spacing,-cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing,cloud.spacing)
    line(-cloud.spacing,cloud.spacing,-cloud.spacing,cloud.spacing,cloud.spacing,-cloud.spacing)

//    cloud.showOld()
    push()
//    translate(width/2, height/2)
    cloud.showAnimation()

    fill(150)
    strokeWeight(0.01)
    textSize(20)
    stroke(255)
    noFill()
    strokeWeight(1)
//    text("current transformation matrix: ", width*2/3, height/4)
//    text(transformationMatrix[0], width*2/3+40, height/4+40)
//    text(transformationMatrix[1], width*2/3+80, height/4+40)
//    text(transformationMatrix[2], width*2/3+40, height/4+80)
//    text(transformationMatrix[3], width*2/3+80, height/4+80)
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

    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
        this.vectors = []
        this.spacing = 150
        for (var i = -this.x; i <= this.x; i++) {
             for (var j = -this.y; j <= this.y; j++){
                   for (var k = -this.z; k <= this.z; k++) {
                       this.vectors.push(createVector(i*this.spacing/this.x, j*this.spacing/this.y, k*this.spacing/this.z))
                   }
             }
        }
    }

    showOld() {
        stroke(255)
        strokeWeight(5)
        for (var i = 0; i < this.vectors.length; i++) {
             point(this.vectors[i].x, this.vectors[i].y, this.vectors[i].z)
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
            this.newVectors.push(createVector(matrix[0]*this.vectors[i].x + matrix[1]*this.vectors[i].y + matrix[2]*this.vectors[i].z,
                                              matrix[3]*this.vectors[i].x + matrix[4]*this.vectors[i].y + matrix[5]*this.vectors[i].z,
                                              matrix[6]*this.vectors[i].x + matrix[7]*this.vectors[i].y + matrix[8]*this.vectors[i].z))
        }
    }

    showAnimation(){
        stroke(255)
        strokeWeight(3)
        for (var i = 0; i < this.vectors.length; i++) {
             this.lerpedVector = p5.Vector.lerp(this.vectors[i], this.newVectors[i], map(sin(millis()/1000), -1, 1, 0, 1))
             point(this.lerpedVector.x, this.lerpedVector.y, this.lerpedVector.z)
        }
    }
}
