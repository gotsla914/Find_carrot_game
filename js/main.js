const modal = document.querySelector('.modal');
const madalOverlay = document.querySelector('.madalOverlay');
const btnClose = document.querySelector('.btnClose');


const openModal = () => {
    modal.classList.remove('objHidden');
}

const btnStart =document.querySelector('.btnStart');
btnStart.addEventListener('click', openModal);

const closeModal = () => {
    modal.classList.add('objHidden');
    console.log(modal);
}
btnClose.addEventListener('click', closeModal);
madalOverlay.addEventListener('click', closeModal);