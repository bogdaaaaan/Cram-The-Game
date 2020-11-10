
// fill the field
window.onload = function() {
    var divSquare = '<div class="square" id="$coordinates" onmouseover="squareHover(id)" onmouseout="squareOut(id)" onclick="setSquare(id)"><div class="square-bg"></div></div>';
    var y = 0;
    for (let i = 0; i < 36; i++) {
        if (i % 6 == 0) { y++ };
        var coordsX = (i % 6) + 1;
        var coordsY = y;
        var coords = coordsY + '-' + coordsX;
        document.querySelector('.board').insertAdjacentHTML('beforeend', divSquare.replace('$coordinates', coords));
    }

    if (localStorage.getItem('score') === 'null') {
        document.getElementById('games-history').value = '0:0';
    } else {
        document.getElementById('games-history').value = localStorage.getItem('score');
    }
    
}
