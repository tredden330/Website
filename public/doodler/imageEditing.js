var modelisReady = false;
const classifier = ml5.imageClassifier('DoodleNet', modelReady);
var result;

function preload() {

}

function setup() {
c = createCanvas(400,400);
background(185)
p = createP("Loading...");
}

function draw() {
if (modelisReady) {
  classifier.classify(c, gotResult);
}
}

function mouseDragged() {
  stroke(0);
  strokeWeight(16);
  line(pmouseX, pmouseY, mouseX, mouseY);

  return false;
}


function modelReady() {
  modelisReady = true;
}
function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  p.html(results[0].label + " : " + results[0].confidence)
}
