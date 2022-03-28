'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.gameBtn');
const gameTimer = document.querySelector('.gameTimer');
const gameScore = document.querySelector('.gameScore');

const area = document.querySelector('.gameArea');
const areaRect = area.getBoundingClientRect();

const popUp = document.querySelector('.popUp');
const popUpText = document.querySelector('.popUpText');
const popUpBtn = document.querySelector('.popUpRefresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let timer = undefined;
let score = 0;

//게임 실행 startGame
//게임 중단 stopGame
//게임 종료 finishGame - win/lost

area.addEventListener('click', (event) => onAreaClick(event));
gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});
popUpBtn.addEventListener('click', () => {
  startGame();
  hidePopUp();
});
popUpBtn.addEventListener('click', () => {
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showTimerAndScore(); //타이머, 스코어 표시
  startGameTimer(); // 타이머 시작
  showStopButton(); // 멈춤 버튼으로 변경
  //카운트 시작
  playSound(bgSound);
}


function stopGame() {
  started = false;
  hideGameButton(); //버튼숨김
  showPopUpWithText('REPLAY?'); //팝업
  stopGameTimer(); //타이머 멈춤
  playSound(alertSound);
  stopSound(bgSound);
}

function showPopUpWithText(text) {
  popUpText.innerHTML = text;
  popUp.classList.remove('popUpHide');
}

function hidePopUp() {
  popUp.classList.add('popUpHide');
}


function finishGame(win) {
  started = false;
  stopGameTimer();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
  //팝업
  //재생버튼 사라짐?
  //타이머 멈춤
}
const icon = gameBtn.querySelector('.fa-solid');

function showStopButton() {
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function showStartButton() {
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}


function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}


function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer); //remain...이 0초보다 작거나, 같으면 
      finishGame(score === CARROT_COUNT);
      return; //인터벌 중지(시간끝)
    }
    updateTimerText(--remainingTimeSec);
    // 만약 게임이 계속되고있다면 1초씩 감소(후 타이머에 업데이트)
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes} : ${seconds}`;
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT;
}

function initGame() { // addItem() 이미지 가져오기 - 전달인자에 내가 전달할 이미지 내용
  //버튼(수단)이 아닌, 결과가 일어나야할 곳. 기능 ?, 행동 위치 
  score = 0;
  area.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onAreaClick(event) {
  if (!started) {
    return; //시작상태가 아니라면 나가라! 클릭 소용X
  }
  const target = event.target;
  if (target.matches('.carrot')) { //당근
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      playSound(winSound);
      finishGame(true);
    }
  } else if (target.matches('.bug')) { // 버그
    playSound(bugSound);
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
};


function stopSound(sound) {
  sound.pause();
}

function addItem(className, count, imgPath) { // 랜덤한 위치를 정하려면 x, y값을 정해야함
  const x1 = 0;
  const y1 = 0;
  const x2 = areaRect.width - CARROT_SIZE;
  const y2 = areaRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    area.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

//for문 돌면서 className, imgPath를 넣고, 
// 어디에 배치할건지 위치 지정해줌 - 해당 영역에 요소 추가 (밀어넣기)