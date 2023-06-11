

import '../css/common.css'


const randomColor = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

let timerId = null;

const startBtn = document.querySelector('button[data-start]');

startBtn.addEventListener('click', onStartBtn);

const stopBtn = document.querySelector('button[data-stop]');

stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
    
    timerId = setInterval(() => {
        document.body.style.backgroundColor = randomColor();
    }, 1000);

    startBtn.disabled = true;
};

function onStopBtn() {
    
    timerId = clearInterval(timerId);

    // const backToTheWhite = setTimeout(() => {
        // document.body.style.backgroundColor = 'white';
    // }, 1000);


    // Действие выводит актуальный цвет фона и после нажатия "ОК" возвращает к исходному
    
    const showColor = setTimeout(() => {
        alert(document.body.style.backgroundColor);

        document.body.style.backgroundColor = 'white';
    }, 1000);
    


    startBtn.disabled = false;
};
