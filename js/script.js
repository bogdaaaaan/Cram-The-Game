// теперь есть массив который следит за тем, какие значения есть на столе,
// надо добавить проверку когда мышкой проводишь над блоком,
// что бы тот не менял цвет бг если уже есть значени 1 или 2

var area = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];


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

function checkField(id, x, y) {
    var new_X = id.slice(2,3)-1;
    var new_Y = id.slice(0,1)-1;
    var new_idX = x-1;
    var new_idY = y-1;
    
    if (area[new_Y][new_X] === 1) {
        if (area[new_idY][new_idX] === 1) {
            document.getElementById(id).style.backgroundColor = "blue";
            document.getElementById(y + "-" + x).style.backgroundColor = "blue";
        }
    }

    if (area[new_Y][new_X] === 2) {
        if (area[new_idY][new_idX] === 2) {
            document.getElementById(id).style.backgroundColor = "red";
            document.getElementById(y + "-" + x).style.backgroundColor = "red";
        }
    }
    return false;
}

function squareHover(id) {
    visualBorder(id, currentPos,'in');
}

function squareOut(id) {
    visualBorder(id, currentPos,'out');
}

function setSquare(id) {
    //var square = document.getElementById(id);
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
    } else {
        area[new_Y][new_X] = 1;
        area[new_idY-1][new_idX-1] = 1;
    }
    checkField(id, new_idX, new_idY);
}

function visualBorder(id, pos, inout) {
    
    var square = document.getElementById(id).querySelector(".square-bg");
    var new_X = id.slice(2,3)-1;
    var new_Y = id.slice(0,1)-1;

    console.log(area[new_Y][new_X]);

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