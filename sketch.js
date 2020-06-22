let clicksX = [];
let clicksY = [];
let finished = false;
let saved = false;

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

let ships = [[6, 6, 0, 6, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 6, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 6, 0, 0],
             [6, 6, 6, 6, 6, 0, 0, 6, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 6, 6, 6, 6, 0, 0, 0, 0, 0]];

let size = board.length;

// number of spots occupied by ships
let ship_spots = 0
for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
        if (ships[i][j] === 6) {
            ship_spots += 1;
        }
    }
}
console.log('Spots occupied by ships: ' + ship_spots)


function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(220);
    let counter = 0;
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            // check if already clicked
            let clicked = false;
            for (let z=0; z<clicksX.length; z++) {
                if (clicksX[z] === (i*50) && clicksY[z] === (j*50)) {
                    board[j][i] = 1;
                    clicked = true;
                }
            }
            // draw squares
            if (clicked) {
                let shipHit = false;
                if (ships[j][i] === 6) { // richteg emgoen mat indexing an [x][y]
                    board[j][i] = 2;
                    shipHit = true;
                    counter += 1;
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
        console.log('Possibly taking picture!');
        console.log(board);
        document.getElementById('instructions').innerText = 'Congratulations, you have found all the ships!';
        saved = true;
    }

}

function mouseClicked() {
    clicksX.push(Math.floor(mouseX / 50) * 50);
    clicksY.push(Math.floor(mouseY / 50) * 50);
    console.log(clicksX, clicksY);
}

function valid(board) {
    let temp_ship_spots = 0
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            if (board[i][j] === 6) {
                temp_ship_spots += 1;
            }
        }
    }
    if (temp_ship_spots === 17) {
        return 'possibly valid'
    } else {
        return 'invalid'
    }
}
