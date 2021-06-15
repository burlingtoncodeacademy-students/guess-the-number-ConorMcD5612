const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// prompt user with question func
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Get a random number in a range
function randomNumGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

start();

// Makes array 0 to max
function createArray(max) {
  let gameArray = [];
  for (let i = 1; i <= parseInt(max); i++) {
    gameArray.push(i);
  }

  return gameArray;
}

async function start() {
  // Geting user input for gameArray range and asking them which of the two games they'd like to play
  let whatGame = await ask(
    "Would you, the human (H) like to guess my secret number? Or should I the computer (C) guess yours?"
  );

  let upperBound = await ask("How many numbers would you like to use?");

  // Starting the first or second game based on user input
  if (whatGame === "C") {
    console.log(
      " Ok, let's play a game where you (human) make up a number and I (computer) try to guess it."
    );

    let secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );

    console.log("You entered: " + secretNumber);

    await computerGuess(upperBound);
    cheatDetect(secretNumber);
  } else if (whatGame === "H") {
    console.log(
      "Let's play a game where I (computer) make up a number and you (Human) try to guess it."
    );

    await humanGuess(upperBound);
    process.exit();
  } else {
    console.log("Please enter a valid input");
  }
}

async function computerGuess(upperBound) {
  let gameArray = createArray(upperBound);

  // Initializing while loop variables
  indexStart = 0;
  indexEnd = gameArray.length - 1;
  let playAgain;
  i = 0;

  // gameplay loop incorporating binary search
  while (indexStart <= indexEnd) {
    // adding one to the count at the start of loop
    i++;
    middle = Math.floor(indexStart + (indexEnd - indexStart) / 2);
    middleVal = gameArray[middle];

    // get Higher or lower string
    item = await ask(
      `Is your number ${middleVal} (C) ? Is it higher (H) or lower (L) than ${middleVal}? `
    );

    //Conitional to check if its higher,lower, or correct
    if ("C" === item) {
      // if correct ask() if user wants to replay the game
      console.log("Nice I won");
      console.log(`that took ${i} guesses`);
      playAgain = await ask("Would you like to play again?");
      if (playAgain === "Y") {
        start();
      } else {
        process.exit();
      }
      // if lower change the end of the index to be guess -1
    } else if (item === "L") {
      indexEnd = middle - 1;
    }
    // if higher change start of index to be guess+1
    else if (item === "H") {
      indexStart = middle + 1;
    }
    // if invalid input restart loop and take -1 the iterator
    else {
      i--;
      console.log("Please enter a valid input");
    }
  }
}

async function humanGuess(upperBound) {
  let secretNumber = randomNumGen(1, upperBound);
  let humanGuess = await ask("Whats your guess?");

  // gameplay loop for second game
  while (humanGuess !== secretNumber) {
    if (humanGuess < secretNumber) {
      console.log(`Nope its higher than ${humanGuess}`);
    } else if (humanGuess > secretNumber) {
      console.log(`Nope its lower than ${humanGuess}`);
    } else {
      break;
    }

    humanGuess = await ask("Whats your guess?");
  }

  console.log("Congrats you won!");
}

//check if user cheated
function cheatDetect(secretNumber) {
  if (indexStart !== secretNumber) {
    console.log("You cheated");

    process.exit();
  }
}
