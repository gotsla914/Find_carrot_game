'use strict'


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


// 이미지 받아오기
// 윈도우 좌표 받아오기 (가로 세로)
// 이미지 랜덤으로 배치? api사용 해서 함수 만들기
// 이미지 원하는 위치에 삽입



const CARROT_SIZE = 80;
const area = document.querySelector('.gameArea');
const areaRect = area.getBoundingClientRect();


function initGame() {
    //1. 벌레 당근 생성함수 만들기
    console.log(areaRect);

    //3. initGame에서 addItem호출
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

//2. 인자로는 클래스명, 사진 개수, 경로 넣어줌
function addItem(className, count, imgPath) {
    //4. xy좌표 0, 0  ~ x2, y2까지 설정
    const x1 = 0;
    const y1 = 0;
    const x2 = areaRect.width - CARROT_SIZE;
    const y2 = areaRect.height - CARROT_SIZE;

     //5. 사진 생성함수 - 개수만큼 count 돌리기
        for (let i = 0; i < count ; i++) {

        //5-1. count 돌면서 아이템만들기
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        //받아온 위치를 item에 할당
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        area.appendChild(item); // area자식노드에 item 추가
    }
}
   


    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    initGame();







    // ----------------------------------
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