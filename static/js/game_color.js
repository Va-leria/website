const $ = document.querySelector.bind(document);
const nextButton = $('.next');
const exitButton = $('.exit');
nextButton.addEventListener('click', nextTask); 
exitButton.addEventListener('click', exitGame); 
nextButton.classList.add("hidden");
document.getElementById('next').style.visibility='hidden';

let index = 0;
let currentMode = 'complementary';
let currentIndex = 0;

const colors = [
    '#C5047D',
    '#6D398B',
    '#454E99',
    '#2A71AF',
    '#F3E500',
    '#8DBB25',
    '#008E5A',
    '#0696BB',
    '#FDC60A',
    '#F28E1C',
    '#E96220',
    '#E22321'
];

const complementary = [
    { color: '#C5047D', complement: '#8DBB25' },
    { color: '#6D398B', complement: '#F3E500' }
    // { color: '#454E99', complement: '#FDC60A' },
    // { color: '#2A71AF', complement: '#F28E1C' },
    // { color: '#F3E500', complement: '#6D398B' },
    // { color: '#8DBB25', complement: '#C5047D' },
    // { color: '#008E5A', complement: '#E22321' },
    // { color: '#0696BB', complement: '#E96220' },
    // { color: '#FDC60A', complement: '#454E99' },
    // { color: '#F28E1C', complement: '#2A71AF' },
    // { color: '#E96220', complement: '#0696BB' },
    // { color: '#E22321', complement: '#008E5A' }
];

const triads = [
    ['#C5047D', '#0696BB', '#FDC60A'],
    ['#6D398B', '#008E5A', '#F28E1C']
    // ['#454E99', '#8DBB25', '#E96220'],
    // ['#2A71AF', '#F3E500', '#E22321'],
    // ['#0696BB', '#FDC60A', '#C5047D'],
    // ['#008E5A', '#F28E1C', '#6D398B'],
    // ['#8DBB25', '#E96220', '#454E99'],
    // ['#F3E500', '#E22321', '#2A71AF'],
    // ['#FDC60A', '#C5047D', '#0696BB'],
    // ['#F28E1C', '#6D398B', '#008E5A'],
    // ['#E96220', '#454E99', '#8DBB25'],
    // ['#E22321', '#2A71AF', '#F3E500']
];

const tetrads = [
    ['#C5047D', '#2A71AF', '#8DBB25', '#F28E1C'],
    ['#6D398B', '#E96220', '#F3E500', '#0696BB']
    // ['#454E99', '#008E5A', '#FDC60A', '#E22321'],
    // ['#2A71AF', '#C5047D', '#F28E1C', '#8DBB25'],
    // ['#0696BB', '#F3E500', '#E96220', '#6D398B'],
    // ['#008E5A', '#FDC60A', '#E22321', '#454E99'],
    // ['#8DBB25', '#F28E1C', '#C5047D', '#2A71AF'],
    // ['#F3E500', '#E96220', '#6D398B', '#0696BB'],
    // ['#FDC60A', '#E22321', '#454E99', '#008E5A'],
    // ['#F28E1C', '#C5047D', '#2A71AF', '#8DBB25'],
    // ['#E96220', '#F3E500', '#6D398B', '#0696BB'],
    // ['#E22321', '#FDC60A', '#008E5A', '#454E99']
];


document.addEventListener('DOMContentLoaded', () => {
    setGameMode();
});

function setGameMode() {
    const instruction = document.getElementById('instruction');
    const starsContainer = document.getElementById('stars-container');
    const star1 = document.getElementById('star1');
    const star2 = document.getElementById('star2');
    const star3 = document.getElementById('star3');

    if (currentMode === 'complementary') {
        instruction.textContent = '*Задание: выбери комплементарный цвет для звездочки';
        star1.style.backgroundColor = complementary[currentIndex].color;
        star2.style.display = 'none';
        star3.style.display = 'none';
    } else if (currentMode === 'triad') {
        instruction.textContent = '*Задание: выбери цвет, чтобы составить триаду';
        star1.style.backgroundColor = triads[currentIndex][0];
        star2.style.backgroundColor = triads[currentIndex][1];
        star2.style.display = 'block';
        star3.style.display = 'none';
    } else if (currentMode === 'tetrad') {
        instruction.textContent = '*Задание: выбери цвет, чтобы составить тетраду';
        star1.style.backgroundColor = tetrads[currentIndex][0];
        star2.style.backgroundColor = tetrads[currentIndex][1];
        star3.style.backgroundColor = tetrads[currentIndex][2];
        star2.style.display = 'block';
        star3.style.display = 'block';
    }
    if (currentIndex < getModeArray().length-1) {
        currentIndex += 1
    }
    else {
        currentIndex = 0
    }
    index += 1
}

function checkColor(selectedColor) {
    const result = document.getElementById('result');
    let correctColor;

    if (currentMode === 'complementary') {
        correctColor = complementary[currentIndex].complement;
    } else if (currentMode === 'triad') {
        correctColor = triads[currentIndex][2];
    } else if (currentMode === 'tetrad') {
        correctColor = tetrads[currentIndex][3];
    }

    if (selectedColor === correctColor) {
        if (index == 6) {
            result.setAttribute('style', 'white-space: pre;');
            result.textContent = "ВЕРНО! \r\n";
            result.textContent += "Игра завершена!"
        }
        else {
            result.textContent = 'ВЕРНО!';
            nextButton.classList.remove("hidden");
            document.getElementById('next').style.visibility='visible';
        }
        const data ={
            score: index
        }
    
        fetch('http://localhost:3030/game_color', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    } else {
        result.textContent = 'ПОПРОБУЙ ЕЩЕ РАЗ!';
    }
}

function nextTask() {
    nextButton.classList.add("hidden");
    document.getElementById('next').style.visibility='hidden';
    if (index < 2) {
        currentMode = 'complementary'
    }
    else if (index >= 2 && index < 4) {
        currentMode = 'triad'
    }
    else if (index >= 4 && index < 6) {
        currentMode = 'tetrad'
    }
    // currentMode = modes[Math.floor(Math.random() * modes.length)];
    // currentIndex = Math.floor(Math.random() * getModeArray().length);

    setGameMode();

    document.getElementById('result').textContent = '';
}

function getModeArray() {
    if (currentMode === 'complementary') {
        return complementary;
    } else if (currentMode === 'triad') {
        return triads;
    } else if (currentMode === 'tetrad') {
        return tetrads;
    }
}

function exitGame() {
    alert('Выход из игры!');
}
