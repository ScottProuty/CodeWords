'use strict';

// Selecting elements
const scoreElement = document.querySelector('.scoreBox-score');
const phraseElement = document.querySelector('.phrase');
const scoreBoxElement = document.querySelector('scoreBox');
const btnSubmitElement = document.getElementById('btnSubmit');
const btnDeselectElement = document.getElementById('btnDeselect');
const cardElements = document.querySelectorAll('.wordCard');

// Variables
let longTermScore = 0;
let currentScore = 0;
let currentPhrase = 0;
const ptsPerCorrectGuess = 10;
let cardsList = {};
let codePhrase = 'No phrase found';

// Starting conditions
scoreElement.textContent = 0;
phraseElement.textContent = codePhrase;

//diceElement.classList.add('hidden');

// Define functions
const deselectAllCards = function () {
  cardElements.forEach(element => {
    element.classList.remove('cardSelected');
  });
  for (let card in cardsList) {
    if (cardsList.hasOwnProperty(card)) {
      cardsList[card].selected = false;
    }
  }
};

function nextPhrase() {
  deselectAllCards();
  if (currentPhrase < 2) {
    currentPhrase++;
    givePhrase(currentPhrase);
    console.log(`Advancing to phrase ${currentPhrase}...`);
  } else {
    console.log(`Game over! Total score: ${currentScore}`);
  }
}

function givePhrase(phraseIndex) {
  let phrase = Object.keys(gameInfo.phrases)[phraseIndex];
  // Animate this?
  phraseElement.textContent = phrase;
}

function updateCardDisplay() {
  cardElements.forEach(card => {
    if (cardsList[card.id].used) {
      card.classList.add('used');
    }
  });
}

function submit() {
  let isSelected, isCodeWord, cardWord, isUsed;
  let scoreToAdd = 0;
  for (let card in cardsList) {
    if (cardsList.hasOwnProperty(card)) {
      isSelected = cardsList[card].selected;
      isCodeWord = cardsList[card].isCodeWord[currentPhrase];
      isUsed = cardsList[card].used;
      cardWord = cardsList[card].word.toUpperCase();
      if (isSelected && isCodeWord) {
        // correct selection
        scoreToAdd += 10 * !isUsed + 20 * isUsed;
        console.log(`${cardWord} is CORRECT +10pts`);
      } else if (isSelected && !isCodeWord) {
        // incorrect selection
        scoreToAdd -= 7 * !isUsed + 14 * isUsed;
        console.log(`${cardWord} is INCORRECT -7pts`);
      } else if (!isSelected && isCodeWord) {
        // missed a codeWord
        scoreToAdd -= 3 * !isUsed + 6 * isUsed;
        console.log(`You missed ${cardWord}, -3pts`);
      }
      if (isSelected) {
        cardsList[card].used = true;
      }
    }
  }
  updateCardDisplay();
  addScore(scoreToAdd);
  nextPhrase();
}

const clickCard = function () {
  if (this.classList.contains('cardSelected')) {
    this.classList.remove('cardSelected');
    cardsList[this.id].selected = false;
  } else {
    this.classList.add('cardSelected');
    cardsList[this.id].selected = true;
  }
};

const addScore = function (numPts) {
  currentScore += numPts;
  scoreElement.textContent = currentScore;

  if (numPts > 0) {
    scoreElement.classList.add('addScore');
    scoreElement.addEventListener('animationend', () => {
      scoreElement.classList.remove('addScore');
    });
  } else if (numPts < 0) {
    scoreElement.classList.add('animate-lost');
    scoreElement.addEventListener('animationend', () => {
      scoreElement.classList.remove('animate-lost');
    });
  }
};

const resetGame = function () {
  currentScore = 0;
  //disable deselect button
  scoreElement.textContent = currentScore;
  populateCardList(wordBank);
  givePhrase(wordBank.phrase);
};

function populateCardList(gameInfo) {
  let word = '';
  for (const [index, cardElement] of cardElements.entries()) {
    word = gameInfo.words[index];
    cardElement.textContent = word;
    cardsList[cardElement.id] = {
      word: cardElement.textContent,
      selected: false,
      disabled: false,
      used: false,
      isCodeWord: [
        gameInfo.phrases[Object.keys(gameInfo.phrases)[0]].includes(word),
        gameInfo.phrases[Object.keys(gameInfo.phrases)[1]].includes(word),
        gameInfo.phrases[Object.keys(gameInfo.phrases)[2]].includes(word),
      ],
    };
    cardElement.addEventListener('click', clickCard);
  }
}

// wordBank contains the code phrase, today's 20 words, and correct words
let gameInfo = {
  words: [
    'castle',
    'golfer',
    'September',
    'virgin',
    'spot',
    'still',
    'sparkling',
    'crawl',
    'dust',
    'placid',
    'vehicles',
    'zipper',
    'cool',
    'congested',
    'pirate',
    'true',
    'bonkers',
    'pop',
    'adventure',
    'resilient',
  ],
  phrases: {
    Unfazed: ['still', 'resilient', 'cool', 'placid'],
    'Beverage Options': ['cool', 'virgin', 'still', 'sparkling', 'pop'],
    traffic: ['vehicles', 'crawl', 'zipper', 'congested'],
  },
};
populateCardList(gameInfo);
givePhrase(currentPhrase);

btnSubmitElement.addEventListener('click', submit);
btnDeselectElement.addEventListener('click', deselectAllCards);
// maybe you get three words and the whole bank(?) for each one.
//Maybe some words could be used more than once? or maybe choosing one blocks it for the next one.
