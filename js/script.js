var currentTurn = "Player";
var currentIter = 0;

if (localStorage.getItem('difficulty') === 'null') {
    var difficulty = 'medium';
} else {
    var difficulty = localStorage.getItem('difficulty');
}
console.log('current difficulty is ' + difficulty);



//difficulty check
var firstCheck;
firstCheck = (difficulty === 'easy') ? 3 : (difficulty === 'medium') ? 5 : 7;

var historyGame = [];

var area = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

var scores = {
    "Player" : -10,
    "Equal" : 0,
    "Opponent" : 10
}

function checkWinner() {
    if(!isAvailableSquareLeft()) {
        return currentTurn;
    }
    return null;
}

// optional
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function isAvailableSquareLeft() {
    var array = [];
    var available = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            // check horizontal
            if((area[i][j] == 0) && (area[i][j+1] == 0)) {
                q = j+1;
                let pos = 'horizontal';
                array.push({i,j,q,pos});
                available++;
            }
             // check vertical
            if((area[j][i] == 0) && (area[j+1][i] == 0)) {
                q = j + 1;
                let pos = 'vertical';
                array.push({i,j,q,pos});
                available++;
            }
        }
    }

    if (available === 0) {
        return false;
    }
    // optional
    shuffle(array);
    return array;
}

function opponentMove() {
    console.log('opponent move');
    let bestScore = -Infinity;
    let move;
    let array = isAvailableSquareLeft();
    let counter = (difficulty === 'hard') ? 6 : (difficulty === 'medium') ? 3 : currentIter;
    let depth = (currentIter > 3) ? firstCheck : firstCheck - (counter - currentIter);
    if (array !== false) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.pos === 'horizontal') {
                area[element.i][element.j] = 2;
                area[element.i][element.q] = 2;
                
                let alpha = -Infinity;
                let beta = Infinity;

                let score = AlphaBetaDecision(area, depth, false, alpha, beta);
                
                area[element.i][element.j] = 0;
                area[element.i][element.q] = 0;

                if (score > bestScore) {
                    bestScore = score;
                    let i = element.i;
                    let j = element.j;
                    let q = element.q;
                    let pos = element.pos;
                    move = {i,j,q,pos};
                }
            }
            if (element.pos === 'vertical') {
                area[element.j][element.i] = 2;
                area[element.q][element.i] = 2;

                let alpha = -Infinity;
                let beta = Infinity;

                let score = AlphaBetaDecision(area, depth, false, alpha, beta);
                
                area[element.j][element.i] = 0;
                area[element.q][element.i] = 0;

                if (score > bestScore) {
                    bestScore = score;
                    let i = element.i;
                    let j = element.j;
                    let q = element.q;
                    let pos = element.pos;
                    move = {i,j,q,pos};
                }
            }
        }

        if(move.pos === 'horizontal') {
            area[move.i][move.j] = 2;
            area[move.i][move.q] = 2;
            let y1 = move.i;
            let x1 = move.j;
            let y2 = move.i;
            let x2 = move.q;
            historyGame.push({y1, x1, y2, x2});

            document.getElementById((move.i+1) + "-" + (move.j+1)).style.backgroundColor = "red";
            document.getElementById((move.i+1) + "-" + (move.q+1)).style.backgroundColor = "red";
        }
        else {
            area[move.j][move.i] = 2;
            area[move.q][move.i] = 2;
            let y1 = move.j;
            let x1 = move.i;
            let y2 = move.q;
            let x2 = move.i;
            historyGame.push({y1, x1, y2, x2});


            document.getElementById((move.j+1) + "-" + (move.i+1)).style.backgroundColor = "red";
            document.getElementById((move.q+1) + "-" + (move.i+1)).style.backgroundColor = "red";
        }
    
        if(checkWinner() !== null) {
            var result = currentTurn + " Wins!";
            console.log(result);
            updateScore(currentTurn);
            document.getElementById('game-result').value = result;
            document.getElementById('endgame').style.display = 'flex';
        }
        currentTurn = "Player";
        console.log(historyGame);
        console.log('player move');
    }
}

function AlphaBetaDecision(area, depth, isMaximizing, alpha, beta) {
    let winner = checkWinner();
    if (winner !== null) {
        return scores[winner];
    } else if (depth === 0) {
        return scores["Equal"];
    }

    if(isMaximizing) {
        currentTurn = "Opponent";
        let bestValue = -Infinity;
        let array = isAvailableSquareLeft();
        if (array !== false) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if (element.pos === 'horizontal') {
                    area[element.i][element.j] = 2;
                    area[element.i][element.q] = 2;
                        
                    let score = AlphaBetaDecision(area, depth-1, false, alpha, beta);
    
                    area[element.i][element.j] = 0;
                    area[element.i][element.q] = 0;
                    
                    bestValue = Math.max(bestValue, score);
                    alpha = Math.max(alpha, bestValue);
                    if (beta <= alpha) {
                        break;
                    }
                }
                if (element.pos === 'vertical') {
                    area[element.j][element.i] = 2;
                    area[element.q][element.i] = 2;
    
                    let score = AlphaBetaDecision(area, depth-1, false, alpha, beta);
                    
                    area[element.j][element.i] = 0;
                    area[element.q][element.i] = 0;
                    
                    bestValue = Math.max(bestValue, score);
                    alpha = Math.max(alpha, bestValue);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestValue;
        }
    } else {
        currentTurn = "Player";
        let bestValue = Infinity;
        let array = isAvailableSquareLeft();
        if (array !== false) {
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if (element.pos === 'horizontal') {
                    area[element.i][element.j] = 1;
                    area[element.i][element.q] = 1;
                        
                    let score = AlphaBetaDecision(area, depth-1, true, alpha, beta);
    
                    area[element.i][element.j] = 0;
                    area[element.i][element.q] = 0;
                    
                    bestValue = Math.min(bestValue, score);
                    beta = Math.min(beta, bestValue);
                    if (beta <= alpha) {
                        break;
                    }
                }
                if (element.pos === 'vertical') {
                    area[element.j][element.i] = 1;
                    area[element.q][element.i] = 1;

                    let score = AlphaBetaDecision(area, depth-1, true, alpha, beta);
                    
                    area[element.j][element.i] = 0;
                    area[element.q][element.i] = 0;
                    
                    bestValue = Math.min(bestValue, score);
                    beta = Math.min(beta, bestValue);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return bestValue;
        }
    }
}

