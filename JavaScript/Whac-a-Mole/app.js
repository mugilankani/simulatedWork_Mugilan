const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.getElementById('time-left');
const score = document.getElementById("score");

let result = 0;
let hitPosition;
let timerId = null;
let currentTime = 20;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;

            // Flash effect on mole hit
            square.classList.add('flash');
            setTimeout(() => square.classList.remove('flash'), 300);
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

moveMole();

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countdownTimeId);
        clearInterval(timerId);
        // Game Over flash
        document.body.classList.add('game-over-flash');
        setTimeout(() => {
            alert('Game Over : your score is ' + result);
            document.body.classList.remove('game-over-flash');
        }, 500);
    }
}

let countdownTimeId = setInterval(countdown, 1000);
