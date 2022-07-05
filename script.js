/* Guess my number game */
// ---------------------------------------------------------
'use strict';
// ---------------------------------------------------------
// Utility
const secretNumberGenerator = () => {
  return Math.round(Math.random() * 20);
};
// ---------------------------------------------------------
// Mutable variables
let currentNumber, currentScore, currentHighScore, currentMessage, winner;
// ---------------------------------------------------------
// HTML elements
const body = document.querySelector('body'),
  again = document.querySelector('.again'),
  secretNumber = document.querySelector('.random'),
  guess = document.querySelector('.guess'),
  submit = document.querySelector('.submit-button'),
  message = document.querySelector('.message'),
  score = document.querySelector('.score'),
  highScore = document.querySelector('.high-score'),
  defaultMessage = '❌ No number, type something!';
// ---------------------------------------------------------
// Preset
// ---------------------------------------------------------
const preset = () => {
  body.style.backgroundColor = 'white';
  guess.value = null;
  currentNumber = secretNumberGenerator();
  secretNumber.textContent = '?';
  message.textContent = defaultMessage;
  currentScore = 20;
  score.textContent = currentScore;
  winner = false;
};
preset();
// Set high score
currentHighScore = 0;
highScore.textContent = currentHighScore;
// ---------------------------------------------------------
// Events
// ---------------------------------------------------------
// Game logic
submit.addEventListener('click', function(event) {
  // No reload on submit
  event.preventDefault();
  // guess.value to integer
  const guessInt = parseInt(guess.value);
  // Message and score
  if (currentScore > 1) {
    // Lock the game when there's a winner
    if (!winner) {
      if (guessInt === currentNumber) {
        currentMessage = '💚 Numbers are equal!';
        secretNumber.textContent = currentNumber;
        body.style.backgroundColor = 'rgb(0,255,50)';
        winner = true;
        if (currentHighScore < currentScore) {
          currentHighScore = currentScore;
          highScore.textContent = currentHighScore;
        }
      } else if (guessInt !== currentNumber) {
        currentMessage =
          guessInt > currentNumber ? '📈 Too high!' : '📉 Too low!';
        currentScore--;
      } else if (!guessInt) {
        currentMessage = defaultMessage;
      }
    }
  } else {
    // Lock the game when there's a looser
    currentMessage = '😑 You lost the game!';
    currentScore = 0;
    secretNumber.textContent = currentNumber;
    body.style.backgroundColor = 'rgb(255,0,0)';
  }
  // Change the messages in the document
  message.textContent = currentMessage;
  score.textContent = currentScore;
});
// Reset
again.addEventListener('click', function() {
  preset();
});
// ---------------------------------------------------------
