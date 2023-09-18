
function setup() {

  c = createCanvas(500,500)

}

function draw() {

    background = (0)

    if (millis() > 5000) {

	board = pyscript.interpreter.globals.get('str_board')
        moves = pyscript.interpreter.globals.get('move')

        resizeCanvas(600,600)
    }

    
}

