let clicksX = [];
let clicksY = [];
let finished = false
let saved = false

let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
let size = board.length;

let shipsX = [[0, 1],
             [3, 3, 3],
             [7, 7, 7],
             [1, 2, 3, 4],
             [0, 1, 2, 3, 4]]
let shipsY = [[0, 0],
              [0, 1, 2],
              [3, 4, 5],
              [9, 9, 9, 9],
              [5, 5, 5, 5, 5]]

let ship_spots = 0
for (i=0; i<shipsX.length; i++) {
    ship_spots += shipsX[i].length
}

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(220);
    let counter = 0
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            // check if already clicked
            let clicked = false
            for (let z=0; z<clicksX.length; z++) {
                if (clicksX[z] === (i*50) && clicksY[z] === (j*50)) {
                    board[j][i] = 1
                    clicked = true
                }
            }
            // draw squares
            if (clicked) {
                let shipHit = false
                for (let a=0; a<shipsX.length; a++) {
                    for (let b=0; b<shipsX[a].length; b++) {
                        if (shipsX[a][b] === (j) && shipsY[a][b] === (i)) { // richteg emgoen mat indexing an [x][y]
                            board[j][i] = 2
                            shipHit = true
                            counter += 1
                        }
                    }
                }

                if (shipHit) {
                    fill(10);
                    rect(50 * i, 50 * j, 50, 50);
                    fill(200, 40, 40);
                    ellipse((50 * i) + 25, (50 * j) + 25, 20, 20);
                } else {
                    fill(10);
                    rect(50 * i, 50 * j, 50, 50);
                    fill(40, 200, 40);
                    ellipse((50 * i) + 25, (50 * j) + 25, 20, 20);
                }
            } else if (50*i < mouseX && mouseX < (50*i)+50 && 50*j < mouseY && mouseY < (50*j)+50) {
                fill(80);
                rect(50 * i, 50 * j, 50, 50);
            } else {
                fill(150);
                rect(50 * i, 50 * j, 50, 50);
            }
        }
    }

    if (counter === ship_spots && !saved) {
        // saveCanvas('Canvas_x', 'jpg')
        console.log('Possibly taking picture!')
        console.log(board)
        saved = true
    }

}

function mouseClicked() {
    clicksX.push(Math.floor(mouseX / 50) * 50);
    clicksY.push(Math.floor(mouseY / 50) * 50);
    console.log(clicksX, clicksY);
}

function valid(board) {
    return 'pass'
}
