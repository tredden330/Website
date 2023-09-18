
function setup(){

    createCanvas(windowWidth, windowHeight, WEBGL)

    cloud = new pointCloud(3,3,3)
    transformationMatrix = [1, 0, 0,
                            0, 1, 0,
                            0, 0, 1]
    cloud.applyMatrix(transformationMatrix)

    cam = createCamera()
    cam.camera(0, -400, 800, 0, 0, 0, 0, 1, 0)
    isRotating = true
    updateTime = 0

    createStaticElements()
}

function draw(){

    orbitControl()

    cloud.applyMatrix(transformationMatrix)

    if (isRotating){
    updateTime += 0.005
    }
    rotateY(updateTime)

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

    cloud.showAnimation()

    fill(150)
    strokeWeight(0.01)
    textSize(20)
    stroke(255)
    noFill()
    strokeWeight(1)
}

function mousePressed() {
    if (dist(mouseX,mouseY,width*2/3+40,height/4+40) < 20) {
        console.log("you are epic")
    }
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function changeLook(col, weight, fil){
    stroke(col)
    strokeWeight(weight)
    if (fil !== false) {
        fill(fil)
    } else {
        noFill()
    }
}


function createStaticElements() {

    font = '#ea00ff'
    link_font = '#ab04ba'

    let p = createP('thomas redden');
    p.style('font-size', '16px');
    p.style('color', font)
    p.style('text-align', 'left')
    p.style('margin', '0 auto')
    p.position(width - 125, height -20);

    let t = createP('3d transformation matrix (interactive!)');
    t.style('font-size', '16px');
    t.style('color', font)
    t.style('text-align', 'center')
    t.style('margin', '0 auto')
    t.position(width*3/4 + 20, 300);

    let s = createP('more of my stuff:');
    s.style('font-size', '20px');
    s.style('color', font)
    s.style('text-align', 'center')
    s.style('margin', '0 auto')
    s.position(75, 200);

    let a = createA("snake_game/index.html", "Snake game")
    a.position(110, 250)
    a.style('color', link_font)

    let run = createA("run_game/index.html", "Run! game")
    run.position(110, 300)
    run.style('color', link_font)

    let doodler = createA("doodler/index.html", "Doodle Guesser")
    doodler.position(110,275)
    doodler.style('color', link_font)

    let python = createA("python/index.html", "Python")
    python.position(110,325)
    python.style('color', link_font)

    let sound = createA("sound/index.html", "Synth")
    sound.position(110,350)
    sound.style('color', link_font)



    button = createButton('auto-rotate');
    button.position(width*5/6 - 18, height - 400);
    button.mousePressed(toggleRotation);
    button.style('background-color', '#2a7863')



    inputs = []
    for (var i = 0; i < transformationMatrix.length; i++) {
        inputs[i] = createInput(str(transformationMatrix[i]))
        inputs[i].size(100)
        inputs[i].id(i)
        if (i < 3){
        inputs[i].position((i%3)*120 + width*3/4, 150 + height/3)
        } else if (i >= 3 && i < 6) {
        inputs[i].position((i%3)*120 + width*3/4, 175 + height/3)
        } else if (i >= 6) {
        inputs[i].position((i%3)*120 + width*3/4, 200 + height/3)
        }
        if (i % 3 == 0) {
        inputs[i].style('background-color', '#870000')
        } else if (i % 3 == 1){
        inputs[i].style('background-color', '#008700')
        } else if (i % 3 == 2) {
        inputs[i].style('background-color', '#000087')
        }
        inputs[i].style('color', '#ffffff')
        inputs[i].style('text-align', 'center')
//        inputs[i].style('background-color', '#000000')
        inputs[i].input(myInputEvent)
    }
}

function myInputEvent(event) {
  id = event.srcElement.id
  console.log('you are typing: ', this.value());
  transformationMatrix[id] = this.value()
}

function toggleRotation(){
    isRotating = !isRotating
}
class pointCloud {

    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
        this.vectors = []
        this.colors = []
        this.spacing = 150
        for (var i = -this.x; i <= this.x; i++) {
             for (var j = -this.y; j <= this.y; j++){
                   for (var k = -this.z; k <= this.z; k++) {
                       this.vectors.push(createVector(i*this.spacing/this.x, j*this.spacing/this.y, k*this.spacing/this.z))
                       this.mapped_i = map(i, -this.x, this.x, 0, 250)
                       this.mapped_j = map(j, -this.y, this.y, 0, 250)
                       this.mapped_k = map(k, -this.z, this.z, 0, 250)

                        this.colors.push(color(this.mapped_i, this.mapped_j, this.mapped_k))
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
        strokeWeight(10)
        for (var i = 0; i < this.vectors.length; i++) {
             point(this.newVectors[i].x, this.newVectors[i].y)
        }
    }

    applyMatrix(matrix){
        this.newVectors = []
        for (var i = 0; i < this.vectors.length; i++) {
            this.newVectors.push(createVector(matrix[0]*this.vectors[i].x + matrix[1]*this.vectors[i].y + matrix[2]*this.vectors[i].z,
                                              matrix[3]*this.vectors[i].x + matrix[4]*this.vectors[i].y + matrix[5]*this.vectors[i].z,
                                              matrix[6]*this.vectors[i].x + matrix[7]*this.vectors[i].y + matrix[8]*this.vectors[i].z))
        }
    }

    showAnimation(){
        stroke(255)
        strokeWeight(20)
        for (var i = 0; i < this.vectors.length; i++) {
             this.lerpedVector = p5.Vector.lerp(this.vectors[i], this.newVectors[i], map(sin(millis()/1000), -1, 1, 0, 1))
             stroke(this.colors[i])
             point(this.lerpedVector.x, this.lerpedVector.y, this.lerpedVector.z)
        }
    }
}
