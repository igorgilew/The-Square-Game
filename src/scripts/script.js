const GAME_FIELD = document.getElementById("game-field");
const TIME_FIELD = document.getElementById("timer");
const SCORE_FIELD = document.getElementById("scores");
const GF_WIDTH = GAME_FIELD.clientWidth;
const GF_HEIGHT = GAME_FIELD.clientHeight;

const GAME_TIME = 20; //seconds

const INITIAL_STATE = {
    playerScore: 0,
    level: 1,
    opacity: 30
}

let gameState = {
    playerScore: 0,
    level: 2,
    playerName: 'igor',
    opacity: 30
}

let isGameStarted = false;

let squareArea = function (squareCount) {
    let gameFieldArea = (GF_HEIGHT-2*Math.sqrt(squareCount)) * (GF_WIDTH-2*Math.sqrt(squareCount));
    return gameFieldArea / squareCount;
}

let renderGameField = function () {
    clearGameField();
    let squareCount = (gameState.level + 1) ** 2;
    let oneSquareSize = Math.sqrt(squareArea(squareCount));

    let squareBackground = getRandomColor();

    let goalSquare = Math.floor(Math.random() * squareCount + 1);

    for (let i = 0; i < squareCount; i++) {
        let square = document.createElement("div");
        square.style.width = `${oneSquareSize}px`;
        square.style.height = `${oneSquareSize}px`;
        square.style.background = squareBackground;
        if (goalSquare === i + 1 && isGameStarted) {
            square.id = 'goal';
            square.style.opacity = `${gameState.opacity}%`;
            square.addEventListener("click", onGoalSquareClick);
        }
        GAME_FIELD.appendChild(square);
    }
}

let clearGameField = function () {
    while (GAME_FIELD.firstChild) {
        GAME_FIELD.firstChild.remove();
    }
}

let onGoalSquareClick = function () {
    gameState.level++;
    gameState.playerScore += 100;
    if (gameState.opacity < 80) {
        gameState.opacity += 5;
    }
    SCORE_FIELD.innerHTML = `Scores ${gameState.playerScore}`;
    renderGameField();
}

let onButtonStartClick = function () {
    gameState = {
        playerName: gameState.playerName,
        ...INITIAL_STATE
    };
    isGameStarted = true;
    renderGameField();
    initGameTimer();
    let time = GAME_TIME;
    let id = setInterval(()=>{
        if (time > 0) {
            time--;
            TIME_FIELD.innerHTML = getTimerString(time);
        } else {
            document.getElementById("goal")?.removeEventListener("click", onGoalSquareClick);
            isGameStarted = false;
            clearInterval(id);
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

let getRandomColor = function () {
    //https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
    return '#' + Math.floor(Math.random()* (256 * 256 * 256)).toString(16).padStart(6, '0');
}

window.onload = function () {
    initGameTimer();
    renderGameField();
}