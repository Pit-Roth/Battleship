let clicksX = [];
let clicksY = [];
let scores = [];
let finished = false;
let saved = false;
let shipSizes = shuffleArray([2, 3, 3, 4, 5]);
let shipSpots = 0
for (let i = 0; i<shipSizes.length; i++) {
    shipSpots += shipSizes[i]
}
let n_ships = shipSizes.length

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

let ships = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

// number of spots occupied by ships
function countShips(board) {
    let ship_spots = 0
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 6) {
                ship_spots += 1;
            }
        }
    }
    console.log('Spots occupied by ships: ' + ship_spots);
    console.log('If the number above is not 17: something went wrong');
}

function choose(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
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

function stats(board) {
    let shots = 0
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            if (board[i][j] === 1 || board[i][j] === 2) {
                shots += 1;
            }
        }
    }
    return shots
}

function placeShips(ship_board, ship_sizes) {
    console.log('Randomly placing ship...');
    let temp = 0;
    let temp_size = ship_board.length;
    while (temp <= n_ships) {
        let orientation = choose(['horizontal', 'vertical']);
        let ship_size = ship_sizes.pop();
        let possibilities = [];
        if (orientation === 'horizontal') {
            for (let i = 0; i<temp_size; i++) {
                for (let j = 0; j<temp_size; j++) {
                    let fit = true;
                    for (let k = 0; k<ship_size; k++) {
                        if ((i+k)<temp_size) {
                            if (ship_board[j][i+k] !== 0) {
                                fit = false;
                            }
                        } else {
                            fit = false;
                        }
                    }
                    if (fit) {
                        possibilities.push([j, i])
                    }
                }
            }
            let chosen = choose(possibilities)
            for (let l = 0; l<ship_size; l++) {
                ship_board[chosen[0]][chosen[1]+l] = 6
            }
        } else {
            for (let i = 0; i<temp_size; i++) {
                for (let j = 0; j<temp_size; j++) {
                    let fit = true;
                    for (let k = 0; k<ship_size; k++) {
                        if ((j+k)<temp_size) {
                            if (ship_board[j+k][i] !== 0) {
                                fit = false;
                            }
                        } else {
                            fit = false;
                        }
                    }
                    if (fit) {
                        possibilities.push([j, i])
                    }
                }
            }
            let chosen = choose(possibilities)
            for (let l = 0; l<ship_size; l++) {
                ship_board[chosen[0]+l][chosen[1]] = 6
            }
        }
        temp += 1
    }
    return ship_board
}


// p5.js
function setup() {
    createCanvas(500, 500);
    ships = placeShips(ships, shipSizes)
    //console.log(ships)
    countShips(ships)
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

    if (counter === shipSpots && !saved) {
        // saveCanvas('Canvas_x', 'jpg')
        console.log('Possibly taking picture!');
        console.log(board);
        document.getElementById('instructions').innerText = 'Congratulations, you have found all the ships! (It took you: ' + stats(board) + ' shots)';
        // document.getElementById('average').innerText = 'Average: ' + '';
        saved = true;
    }
}

function mouseClicked() {
    clicksX.push(Math.floor(mouseX / 50) * 50);
    clicksY.push(Math.floor(mouseY / 50) * 50);
    console.log(clicksX, clicksY);
}
