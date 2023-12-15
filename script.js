'use strict';

// Selecting elements
const scoreElement = document.querySelector('.scoreBox-score');
const phraseElement = document.querySelector('.phrase');
const scoreBoxElement = document.querySelector('scoreBox');
const btnNew = document.querySelector('.btn--new');

// Variables
let longTermScore = 0;
let currentScore = 0;

// Starting conditions
scoreElement.textContent = 0;
diceElement.classList.add('hidden');

// Define functions

const holdScore = function () {
  scores[activePlayer] += currentScore;
  score0Element.textContent = scores[0];
  score1Element.textContent = scores[1];
  if (scores[activePlayer] >= 100) winner(activePlayer);
  else {
    const currentPlayerTotalScoreLabel = document.getElementById(
      `score--${activePlayer}`
    );
    const currentPlayerScoreLabel = document.getElementById(
      `current--${activePlayer}`
    );

    if (currentScore > 0) {
      currentPlayerScoreLabel.classList.add('animate-hold');

      currentPlayerTotalScoreLabel.classList.add('addScore');
      currentPlayerTotalScoreLabel.addEventListener('animationend', () => {
        currentPlayerTotalScoreLabel.classList.remove('addScore');
      });
    }
    switchPlayer();
  }
};

const winner = function () {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  document.getElementById(`currentLbl--${activePlayer}`).textContent = '👑';
  document.getElementById(`current--${activePlayer}`).textContent = 'WINNER!';
};

const resetGame = function () {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  document.getElementById(`currentLbl--0`).textContent = 'CURRENT';
  document.getElementById(`currentLbl--1`).textContent = 'CURRENT';
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  score0Element.textContent = scores[0];
  score1Element.textContent = scores[1];
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  current0Element.classList.remove('animate-lost', 'animate-hold');
  current1Element.classList.remove('animate-lost', 'animate-hold');
};

const switchPlayer = function () {
  //document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Add functions to buttons
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', resetGame);
