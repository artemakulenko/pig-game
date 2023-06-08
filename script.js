'use strict';

const buttonNewGame = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');
const diceImage = document.querySelector('img.dice');
const winNumber = 100;
let isGameOn = true;

const switchPlayer = () => {
  players.forEach(item => {
    item.classList.toggle('player--active');
  });
};

const playerWin = () => {
  isGameOn = false;
  const activePlayer = document.querySelector('.player--active');
  activePlayer.classList.add('player--winner');
  diceImage.classList.add('hidden');
};

buttonRoll.addEventListener('click', function () {
  const currentScore = document.querySelector('.player--active .current-score');
  const randomNumber = Math.trunc(Math.random() * 6) + 1;

  if (isGameOn) {
    diceImage.classList.remove('hidden');
    diceImage.src = `img/dice-${randomNumber}.png`;

    if (randomNumber === 1) {
      currentScore.textContent = 0;
      switchPlayer();
    } else {
      currentScore.textContent =
        Number(currentScore.textContent) + randomNumber;
    }
  }
});

buttonHold.addEventListener('click', function () {
  const currentScore = document.querySelector('.player--active .current-score');
  const current = document.querySelector('.player--active .score');

  if (isGameOn) {
    current.textContent =
      Number(current.textContent) + Number(currentScore.textContent);
    currentScore.textContent = 0;

    if (current.textContent >= winNumber) playerWin();
    switchPlayer();
  }
});

buttonNewGame.addEventListener('click', function () {
  diceImage.classList.add('hidden');

  players.forEach((item, index, arr) => {
    item.querySelector('.score').textContent = 0;
    item.querySelector('.current-score').textContent = 0;
    item.classList.remove('player--winner');

    arr[index].classList.remove('player--active');
    arr[0].classList.add('player--active');
  });

  isGameOn = true;
});
