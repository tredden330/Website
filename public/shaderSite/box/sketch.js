let myShader;

function preload() {

	myShader = loadShader("shader.vert", "shader.frag");
}

function setup() {

	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(0);

	shader(myShader);

	camera(0,0,2000,0,0,0,0,1,0)

	rotateX(frameCount * 0.05);
//	rotateY(frameCount * 0.001);

	translate(-500, -500, 0)
	generateGrid(20,20,100)
	rotateY(PI/2);
	generateGrid(20,20,100)
	stroke(255)

}

function generateGrid(xSize, ySize, sideLength) {

	beginShape(QUADS)
	for (var i = 0; i < xSize; i++) {
		for (var j = 0; j < ySize; j++) {
			vertex(i*sideLength, j*sideLength, 0, i/xSize, j/ySize)
			vertex((i+1)*sideLength,j*sideLength, 0, (i+1)/xSize, j/ySize)
			vertex((i+1)*sideLength,(j+1)*sideLength,0,(i+1)/xSize,(j+1)/ySize)
			vertex(i*sideLength,(j+1)*sideLength,0,i/xSize,(j+1)/ySize)
		}
	}
	endShape()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
