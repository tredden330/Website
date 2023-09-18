let mySound;

function setup() {
  createCanvas(windowWidth, windowHeight);

    fft = new p5.FFT()
    osc = new p5.Oscillator()
    osc2 = new p5.Oscillator()

}

function draw() {

    background(0)

    osc.freq(mouseX)
    osc.amp(0.3)

    osc2.freq(mouseY)
    osc2.amp(0.3)

    fill(255)
    textSize(30)
    textAlign(LEFT, TOP)
    text("frequency one: " + mouseX + "\nfrequency two: " + mouseY, 0,0)

    x = []
    y = []
    samples = 2500

    print(osc.getFreq())
    let inc = 2*PI / samples;
    let a = 0.0
    for (i = 0; i < samples; i++) {
        x.push(i)
        y.push(sin(a*osc.getFreq()) + sin(a*osc2.getFreq()))
        a += inc
    }

    fill(255)
    stroke(255)
    translate(0, height/2)
    y_scale = 100
    x_scale = 1
    for (i = 0; i < samples-1; i++) {
        line(x[i]*x_scale, y[i]*y_scale, x[i+1]*x_scale, y[i+1]*y_scale)
    }

}

function mouseClicked(){

    osc.start()
    osc2.start()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
