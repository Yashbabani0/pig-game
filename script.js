"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0"); // Current Score Display
const current1El = document.querySelector("#current--1"); // Current Score Display

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Genrating A Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1; //This Dice Is For Number Itself And DiceEl Is For Number Element Both Are Diffrent.

    // 2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;
    // console.log(dice);

    // 3. Check For Rolled 1
    if (dice !== 1) {
      // Add Dice To Current Score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch To Next Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add Current Score To Active Player's Score
    scores[activePlayer] += currentScore;
    // Scores[1] = Scores[1] + CurrentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check If Player's Score Is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish The Game
      playing = false;
      diceEl.classList.add("hidden");
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch To The Next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
