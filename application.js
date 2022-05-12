const options = ["paper", "scissors", "rock"];
let computer_wins = 0;
let player_wins = 0;
let tied = 0;

let currentNumGames = 1;
let maxNumGames = 5;

// Computers make a move
// Returns the move computer made
function computer_play() {
  let option;
  const random = Math.random();

  if (random < 0.33) {
    option = 0;
  } else if (random >=0.33 && random < 0.66) {
    option = 1;
  } else {
    option = 2;
  }

  return options[option]
}

// Announce the result of the game
function announce_result() {
  if (computer_wins > player_wins) {
    console.log("Computer wins! It won " + computer_wins + " games");
    playerPrompt.textContent = "Computer wins! It won " + computer_wins + "/" + maxNumGames + "games";
  } else if (computer_wins < player_wins) {
    console.log("You win!\nYou won " + player_wins + "/" + maxNumGames + "games");
    playerPrompt.textContent = "You wins! You won " + player_wins + "/" + maxNumGames + "games";
  } else {
    console.log("Even games between you and computer!");
    playerPrompt.textContent = "Even games between you and computer!";
  }
}

// Updates the GUI (scores, announce results...etc)
// Result of the currentRound
function update_gui(roundResult) {
  playerScores.textContent = "Player: " + player_wins;
  computerScores.textContent = "Computer: " + computer_wins;
  tiedScores.textContent = "Tied: " + tied;
  currentResult.textContent = roundResult;

  if (currentNumGames >= maxNumGames) {
    announce_result()
  }
}


// Player makes a move
// Plays a round
function play_round(playerSelection, e) {
  if (currentNumGames > maxNumGames) {
    return;
  }

  let roundResult = "";
  let computerSelection = computer_play();
  if (playerSelection === computerSelection) {
    console.log("Even round. You and computer both had "+ playerSelection);
    roundResult = "Even round."
    tied += 1;
    update_gui(roundResult);
    currentNumGames += 1;
    e.stopPropagation(); // stops any bubbling things
    return;
  }

  if (playerSelection === "paper") { // localeCompare also seems to word
    if (computerSelection === "rock") {
      console.log("You Win! Paper beats rock")
      player_wins += 1;
    } else {
      console.log("You lose! Scissors beats paper");
      roundResult = "You lose! Scissors beats paper";
      computer_wins += 1;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "rock") {
      console.log("You lose! Rock beats scissors");
      computer_wins += 1;
      roundResult = "You lose! Rock beats scissors";
    } else {
      console.log("You win! Scissors beats paper");
      player_wins += 1;
      roundResult = "You win! Scissors beats paper";
    }
  } else { // player rock
    if (computerSelection === "paper") {
      console.log("You lose! Paper beats rock.");
      computer_wins += 1;
      roundResult = "You lose! Paper beats rock.";
    } else {
      console.log("You win! Rock beats scissors")
      player_wins += 1;
      roundResult = "You win! Rock beats scissors";
    }
  }

  update_gui(roundResult);
  currentNumGames += 1;
  e.stopPropagation(); // stops any bubbling things
}


// Get buttons
const btns = document.querySelectorAll('button');

btns.forEach((button) => {
  // plays the game depending on what button is clicked
  // note: need to take care of bubbling and stop propagation

  button.addEventListener('click', function(e) {
    play_round(button.id, e)
  });
})

const playerScores = document.querySelector(".record > .player");
const computerScores = document.querySelector(".record > .computer");
const tiedScores = document.querySelector(".record > .tied");
const currentResult = document.querySelector(".scores > .round_result");
const playerPrompt = document.querySelector(".player_play > .prompt");
