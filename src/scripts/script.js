const GAME_FIELD = document.getElementById("game-field");
const GF_WIDTH = GAME_FIELD.clientWidth;
const GF_HEIGHT = GAME_FIELD.clientHeight;

let gameState = {
    playerScore: 0,
    level: 2,
    playerName: ''
}

let squareArea = function (squareCount) {
    let gameFieldArea = (GF_HEIGHT-2*Math.sqrt(squareCount)) * (GF_WIDTH-2*Math.sqrt(squareCount));
    return gameFieldArea / squareCount;
}

let renderGameField = function () {
    let squareCount = (gameState.level + 1) ** 2;
    let oneSquareSize = Math.sqrt(squareArea(squareCount));

    for (let i = 0; i < squareCount; i++) {
        let square = document.createElement("div");
        square.style.width = `${oneSquareSize}px`;
        square.style.height = `${oneSquareSize}px`;
        square.style.background = 'gray';
        GAME_FIELD.appendChild(square);
    }
}

window.onload = function () {
    renderGameField();
}