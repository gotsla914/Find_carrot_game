const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.madalOverlay');
const btnClose = document.querySelector('.btnClose');


const openModal = () => {
    modal.classList.remove('objHidden');
}

const btnStart = document.querySelector('.btnStart');
btnStart.addEventListener('click', openModal);

const closeModal = () => {
    modal.classList.add('objHidden');
}
btnClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);



// 시간초과
const gameOver = document.querySelector('.gameOver');
const btnGameOverClose = document.querySelector('.gameOverClose');
const gameOverlay = document.querySelector('.gameOverlay')

const openTimOutModal = () => {
    gameOver.classList.remove('objHidden');
}
setTimeout(openTimOutModal, 3000);

const closeGameOverModal = () => {
    gameOver.classList.add('objHidden');
}
btnGameOverClose.addEventListener('click', closeGameOverModal);

const timer = document.querySelector('.timer');
let timeCount = 0;
setInterval(updateTimeCount, 1000);

function updateTimeCount() {
    timeCount++;
    timer.innerHTML = timeCount;
}