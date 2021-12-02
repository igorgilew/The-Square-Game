const GAME_FIELD = document.getElementById("game-field");
const TIME_FIELD = document.getElementById("timer");
const GF_WIDTH = GAME_FIELD.clientWidth;
const GF_HEIGHT = GAME_FIELD.clientHeight;

const GAME_TIME = 10; //seconds

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

let onButtonStartClick = function () {
    initGameTimer();
    let time = GAME_TIME;
    setInterval(()=>{
        if (time > 0) {
            time--;
            TIME_FIELD.innerHTML = getTimerString(time);
        } else {
            clearInterval();
        }

    }, 1000);
}

let getTimerString = function (time) {
    let minutes = String(time / 60);
    let seconds = String(time % 60);
    return `Time: ${ minutes.indexOf('.') !== -1 ?
        minutes.substring(0, minutes.indexOf('.')) : minutes}:${seconds.length === 1 ? '0'+seconds : seconds}`;
}

let initGameTimer = function () {
    TIME_FIELD.innerHTML = getTimerString(GAME_TIME);
}

window.onload = function () {
    initGameTimer();
    renderGameField();
}