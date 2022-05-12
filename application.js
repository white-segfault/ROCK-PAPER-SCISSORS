const options = ["paper", "scissors", "rock"];
let computer_wins, player_wins = 0;

const numGames = 5;

for (let i = 0; i < numGames; ++i) {
  const playerOption = playerPlay();
  const computerOption = computerPlay();
  console.log(playRound(playerOption, computerOption)); // undefined gets output later because cons.log() evaluates something
}

if (computer_wins > player_wins) {
  console.log("Computer wins!\nIt won " + computer_wins + " games");
} else if (computer_wins < player_wins) {
  console.log("You wins!\nYou won " + player_wins + " games");
} else {
  console.log("Even games between you and computer!");
}


// Computers make a move
// Returns the move computer made
function computerPlay() {
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

// Player makes a move
// returns the move that the player made
function playerPlay() {
  let playerInput = prompt("Make your move for paper scissors rock",
    ""); // default is for default value in the text field
    return playerInput.toLowerCase();
}

// Plays a round
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    console.log("Even round. You and computer both had "+ playerSelection)
    return
  }

  if (playerSelection === "paper") { // localeCompare also seems to word
    if (computerSelection === "rock") {
      console.log("You Win! Paper beats rock")
      player_wins += 1;
    } else {
      console.log("You lose! Scissors beats paper")
      computer_wins += 1;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "rock") {
      console.log("You lose! Rock beats scissors")
      computer_wins += 1;
    } else {
      console.log("You win! Scissors beats paper")
      player_wins += 1;
    }
  } else { // player rock
    if (computerSelection === "paper") {
      console.log("You lose! Paper beats rock.")
      computer_wins += 1;
    } else {
      console.log("You win! Rock beats scissors")
      player_wins += 1;
    }
  }
}
