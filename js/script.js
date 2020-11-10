// теперь есть массив который следит за тем, какие значения есть на столе,
// надо добавить проверку когда мышкой проводишь над блоком,
// что бы тот не менял цвет бг если уже есть значени 1 или 2


var currentTurn = "Player";
var currentIter = 0;

if (localStorage.length < 1) {
    localStorage.setItem('difficulty', 'medium');
}
if (localStorage.getItem('difficulty') === 'null') {
    var difficulty = 'medium';
} else {
    var difficulty = localStorage.getItem('difficulty');
}
console.log('current difficulty is ' + difficulty);


//difficulty check
var firstCheck, secondCheck, thirdCheck;
if (difficulty === 'easy') {
    firstCheck = 1;
    secondCheck = 2;
    thirdCheck = 3;
} else if (difficulty === 'medium') {
    firstCheck = 2;
    secondCheck = 3;
    thirdCheck = 4;
} else {
    firstCheck = 3;
    secondCheck = 4;
    thirdCheck = 5;
}


var area = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

var scores = {
    "Player" : -1,
    "Opponent" : 1
}

function setSquare(id) {
    currentIter++;
    var new_X = id.slice(2,3)-1;
    var new_Y = id.slice(0,1)-1;
    var new_idX = 0;
    var new_idY = 0;


    if (currentPos === 'vertical') {
        new_idX = id.slice(2,3);
        new_idY = Number(id.slice(0,1)) + 1;
        if (new_idY == 7) {
            new_idY = 5;
        }
    } else {
        new_idX = Number(id.slice(2,3)) + 1;
        new_idY = id.slice(0,1);
        if (new_idX == 7) {
            new_idX = 5;
        }
    }

    if (area[new_Y][new_X] === 1 || area[new_Y][new_X] === 2 || area[new_idY-1][new_idX-1] === 1 || area[new_idY-1][new_idX-1] === 2) {
        alert('Текущий блок уже занят!');
        return;
    } else {
        area[new_Y][new_X] = 1;
        area[new_idY-1][new_idX-1] = 1;
        document.getElementById(id).style.backgroundColor = "blue";
        document.getElementById(new_idY + "-" + new_idX).style.backgroundColor = "blue";
    }


    if(checkWinner() === null) {
        currentTurn = "Opponent";
        opponentMove();
    } 
    else if (checkWinner() == currentTurn){
        var result = currentTurn + " Wins!";
        console.log(result);
        updateScore(currentTurn);
        document.getElementById('game-result').value = result;
        document.getElementById('endgame').style.display = 'flex';
    }
}


function checkWinner() {
    if(!isAvailableSquareLeft()) {
        return currentTurn;
    }
    return null;
}


function isAvailableSquareLeft() {
    var available = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            // check horizontal
            if((area[i][j] == 0) && (area[i][j+1] == 0)) {
                available++;
            }

             // check vertical
            if((area[j][i] == 0) && (area[j+1][i] == 0)) {
                available++;
            }
        }
    }
    //console.log("There are " + available + " available turns");

    if (available === 0) {
        return false;
    }
    return true;
}

function opponentMove() {
    let bestScore = -Infinity;
    let move;
    currentIter++;

    var pos = null;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            if((area[i][j] == 0) && (area[i][j+1] == 0)) {
                let q = j + 1;

                area[i][j] = 2;
                area[i][q] = 2;
                
                let alpha = -Infinity;
                let beta = Infinity;

                let score = minimax(area, 0, false, alpha, beta);
                
                area[i][j] = 0;
                area[i][q] = 0;

                if (score > bestScore) {
                  bestScore = score;
                  move = { i, j, q};
                  pos = 'horizontal';
                }
            }

            if((area[j][i] == 0) && (area[j+1][i] == 0)) {
                let q = j + 1;

                area[j][i] = 2;
                area[q][i] = 2;

                let alpha = -Infinity;
                let beta = Infinity;
                let score = minimax(area, 0, false, alpha, beta);
                
                area[j][i] = 0;
                area[q][i] = 0;

                if (score > bestScore) {
                  bestScore = score;
                  move = { i, j, q};
                  pos = 'vertical';
                }
            }

        }
    }

    if(pos === 'horizontal') {
        area[move.i][move.j] = 2;
        area[move.i][move.q] = 2;
        document.getElementById((move.i+1) + "-" + (move.j+1)).style.backgroundColor = "red";
        document.getElementById((move.i+1) + "-" + (move.q+1)).style.backgroundColor = "red";
    }
    else {
        area[move.j][move.i] = 2;
        area[move.q][move.i] = 2;
        document.getElementById((move.j+1) + "-" + (move.i+1)).style.backgroundColor = "red";
        document.getElementById((move.q+1) + "-" + (move.i+1)).style.backgroundColor = "red";
    }
    
    //console.log(area);
    if(checkWinner() !== null) {
        var result = currentTurn + " Wins!";
        console.log(result);
        updateScore(currentTurn);
        document.getElementById('game-result').value = result;
        document.getElementById('endgame').style.display = 'flex';
    }
    currentTurn = "Player";
}

function minimax(area, depth, isMaximizing, alpha, beta) {

// сделать нормальный вывод результата при достижении определенного уровня глубины
// сделай все нормально прошу

    if (currentIter <= 6) {
        if(depth >= firstCheck) {
            return scores[currentTurn];
        }
    } 
    else if (currentIter <= 10) {
        if(depth >= secondCheck) {
            return scores[currentTurn];
        }
    }
    else if (currentIter <= 14) {
        if(depth >= thirdCheck) {
            return scores[currentTurn];
        }
    }

    let result = checkWinner();
    if (result !== null) {
        console.log(result);
        return scores[result];
    }


    if (isMaximizing) { 
        currentTurn = "Opponent";
        let bestScore = -Infinity;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                if((area[i][j] == 0) && (area[i][j+1] == 0)) {
                    let q = j + 1;
    
                    area[i][j] = 2;
                    area[i][q] = 2;
                    
                    let score = minimax(area, depth + 1, false, alpha, beta);
                    area[i][j] = 0;
                    area[i][q] = 0;
    
                    bestScore = Math.max(score, bestScore); 
                    alpha = Math.max(bestScore, alpha);
                    if(alpha > beta) {
                        break;
                    }  
                }
    
                if((area[j][i] == 0) && (area[j+1][i] == 0)) {
                    let q = j + 1;
    
                    area[j][i] = 2;
                    area[q][i] = 2;
                    let score = minimax(area, depth + 1, false, alpha, beta);
                    area[j][i] = 0;
                    area[q][i] = 0;
    
                    bestScore = Math.max(score, bestScore);  
                    alpha = Math.max(bestScore, alpha);
                    if(alpha > beta) {
                        break;
                    }  
                }
    
            }
        }
        return bestScore;

    } else {
        currentTurn = "Player";
        let bestScore = Infinity;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                if((area[i][j] == 0) && (area[i][j+1] == 0)) {
                    let q = j + 1;
    
                    area[i][j] = 1;
                    area[i][q] = 1;
                    let score = minimax(area, depth + 1, true, alpha, beta);
                    area[i][j] = 0;
                    area[i][q] = 0;
    
                    bestScore = Math.min(score, bestScore); 
                    beta = Math.min(bestScore, beta);
                    if(alpha > beta) {
                        break;
                    }  
                }
    
                if((area[j][i] == 0) && (area[j+1][i] == 0)) {
                    let q = j + 1;
    
                    area[j][i] = 1;
                    area[q][i] = 1;
                    let score = minimax(area, depth + 1, true, alpha, beta);
                    area[j][i] = 0;
                    area[q][i] = 0;
    
                    bestScore = Math.min(score, bestScore); 
                    beta = Math.min(bestScore, beta);
                    if(alpha > beta) {
                        break;
                    } 
                }
    
            }
        }
        return bestScore;
    }
}


/*
function minimax(area, depth, isMaximizing) {
    return 1;
}

*/