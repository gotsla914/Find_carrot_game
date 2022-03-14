'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;


const area = document.querySelector('.gameArea');
const areaRect = area.getBoundingClientRect();
const gameBtn = document.querySelector('.gameBtn');
const gameTimer = document.querySelector('.gameTimer');
const gameScore = document.querySelector('.gameScore');

const popUp = document.querySelector('.popUp');
const popUpText = document.querySelector('.popUpText');
const popUpRefresh = document.querySelector('.popUpRefresh');



let started = false; //게임시작여부 기억하는 변수하나
let score = 0; //최종점수 기억하는 변수
let timer = undefined; //(겜시작후) 남은시간을 기억하는 타이머


gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})

popUpRefresh.addEventListener('click', () => {
    startGame();
    // hidePopUp();
})


function startGame() { //처음 시작버튼 눌렀을 때
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
};

function stopGame() { //멈춤 눌렀을 때
    started = false;
    stopGameTimer();
    // area.innerHTML = '';
    hideGameBtn();
    showPopUpWithText(`게임을 멈췄어요
     다시 도전 해볼까요?`);
}

//started = !started; // stared가 true면 반대 false가 할당, 
// stared가 f면 반대 t를 할당, 

function finishGame(win) {
    started = false;
    hideGameBtn();
    showPopUpWithText(win ? '당근을 모두 찾으셨네요!' : '실패.. 재도전?🥲');
}

function refreshGame() { //pop up-start 눌렀을 때
    hideTimerAndScore();
    popUp.classList.add('popUpHide');
    gameBtn.style.visibility = 'visible';
    gameBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

area.addEventListener('click', onAreaClick); // ↓ 와 같음
// area.addEventListener('click', (event) => onAreaClick(event));


function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameBtn() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function hideTimerAndScore() {
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('popUpHide')
}

function hidePopUp() {
    popUp.classList.add('popUpHide')
};


function initGame() {
    area.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;

    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png')
}

function onAreaClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        // 당근!
        target.remove();
        score++;
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        // 버그!
        stopGameTimer();
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;

    const x2 = areaRect.width - CARROT_SIZE;
    const y2 = areaRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNum(x1, x2);
        const y = randomNum(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        area.appendChild(item);
    }
}

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}