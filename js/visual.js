var currentPos = null;
var startPick = document.getElementById('pick');

function pickVertical() {
    var vertical = document.getElementById('vertical');
    vertical.classList.add('active');
    currentPos = 'vertical';
    if (horizontal.classList.contains('active')) {
        horizontal.classList.remove('active')
    }
    startPick.style.display = 'none';
    console.log('Changed pos to: ' + currentPos);
}

function pickHorizontal() {
    var horizontal = document.getElementById('horizontal');
    horizontal.classList.add('active');
    currentPos = 'horizontal';
    if (vertical.classList.contains('active')) {
        vertical.classList.remove('active')
    }
    startPick.style.display = 'none';
    console.log('Changed pos to: ' + currentPos);
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

function visualBorder(id, pos, inout) {
    var square = document.getElementById(id).querySelector(".square-bg");

    if (pos === 'vertical') {
        var new_idX = id.slice(2,3);
        var new_idY = Number(id.slice(0,1)) + 1;
        if (new_idY == 7) {
            new_idY = 5;
        }
        if (inout == 'in') {
            square.style.display = "block";
        document.getElementById(new_idY + "-" + new_idX).querySelector(".square-bg").style.display = "block";
        } else {
            square.style.display = "none";
            document.getElementById(new_idY + "-" + new_idX).querySelector(".square-bg").style.display = "none";
        }
    } else {
        var new_idX = Number(id.slice(2,3)) + 1;
        var new_idY = id.slice(0,1);
        if (new_idX == 7) {
            new_idX = 5;
        }
        if (inout == 'in') {
            square.style.display = "block";
        document.getElementById(new_idY + "-" + new_idX).querySelector(".square-bg").style.display = "block";
        } else {
            square.style.display = "none";
            document.getElementById(new_idY + "-" + new_idX).querySelector(".square-bg").style.display = "none";
        }
    }
}

function squareHover(id) {
    visualBorder(id, currentPos,'in');
}

function squareOut(id) {
    visualBorder(id, currentPos,'out');
}


function updateScore(currentTurn) {
    var cur_score = localStorage.getItem('score').split(':');
    var cur_player_score = cur_score[0];
    var cur_opponent_score = cur_score[1];
    if (currentTurn === "Player") {
        cur_player_score++;
    }
    if (currentTurn === "Opponent") {
        cur_opponent_score++;
    }
    localStorage.setItem('score', cur_player_score + ":" + cur_opponent_score);
}



// settings 
let x = document.querySelector("#settings-screen-id");
document.getElementById('settings-button').addEventListener('click', () => {
    x.classList.toggle('active');
})

function changeDifficulty(id) {
    if (id.split('-')[0] === localStorage.getItem('difficulty')) {
        alert("This difficulty already selected");
    } else {
        var conf = confirm('This may reload your game, continue?');
        if(conf) {
            if (id === 'easy-button') {
                difficulty = 'easy';
            } else if (id === 'medium-button') {
                difficulty = 'medium';
            } else {
                difficulty = 'hard';
            }
            localStorage.setItem('difficulty', difficulty);
            document.location.reload();
        }
    }
    
}
