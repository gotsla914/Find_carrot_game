'use strict'


// 이미지 추가

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const area = document.querySelector('.gameArea');
const areaRect = area.getBoundingClientRect();
//버튼
//타이머
//스코어

// let started = false;         
// let score = 0;             callCount = '';
// let timer = undefined;  timeCount = 0;

// let 
// let 


function init() {
    // // 벌레, 당근 생성 후 area에 추가
    console.log(areaRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}


function addItem(className, count, imgPath){
    //class이름, 몇개출력?, 이미지 경로 전달하면 -> 포지션 랜덤생성 후 area에 추가
    const x1 = 0;
    const y1 = 0;
    const x2 = areaRect.width - CARROT_SIZE;
    const y2 = areaRect.height - CARROT_SIZE;


    //i는 0부터 시작~ count만큼 작아질동안 빙글빙글 돌면서 i를하나씩 증가시킴
    for (let i = 0; i < count ; i++) {
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

init();
// 이미지 받아오기
// 윈도우 좌표 받아오기 (가로 세로)

// 이미지 랜덤으로 배치? api사용 해서 함수 만들기

//
// 이미지 원하는 위치에 삽입






const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.madalOverlay');
const btnClose = document.querySelector('.btnClose');


const openModal = () => {
    modal.classList.remove('objHidden');
}

const closeModal = () => {
    modal.classList.add('objHidden');
}
btnClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

const btnStart = document.querySelector('.btnStart');
btnStart.addEventListener('click', openModal);




// 시간초과
const gameOver = document.querySelector('.gameOver');
const btnGameOverClose = document.querySelector('.gameOverClose');
const gameOverlay = document.querySelector('.gameOverlay')
let callCount = '';
let timeCount = 0;

const openTimOutModal = () => {
    gameOver.classList.remove('objHidden');
}
// setTimeout(openTimOutModal, 11000);

const closeGameOverModal = () => {
    gameOver.classList.add('objHidden');
}
btnGameOverClose.addEventListener('click', closeGameOverModal);

const timer = document.querySelector('.timer');
// callCount = setInterval(updateTimeCount, 1000);

function updateTimeCount() {
    timeCount++;
    timer.innerHTML = timeCount;
    if (timeCount == 10) {
        clearInterval(callCount);
    }
}