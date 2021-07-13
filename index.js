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

async function start() {
  // Geting user input for what game they would like to play, and using my inputSan function on it
  let whatGame = await inputSan(
    await ask(
      "Would you, the human (H) like to guess my secret number? Or should I the computer (C) guess yours?"
    ),
    ["C", "H"]
  );

  //Doing the same for the upperbound which will be used as the max of the rang of numbers
  let upperBound = await inputSan(
    await ask("How many numbers would you like to use?"),
    ["number"]
  );

  //If whatGame is Computer
  if (whatGame === "C") {
    //console log starting message
    console.log(
      " Ok, let's play a game where you (human) make up a number and I (computer) try to guess it."
    );
    //Let user input there secret number
    let secretNumber = await inputSan(
      await ask(
        "What is your secret number?\nI won't peek, I promise...\n"
        //input san requires array has number in it so we can seperate strings from numbers in input san
      ),
      ["number"]
    );
    //Telling user the number they inputted
    console.log("You entered: " + secretNumber);
    //Running computerGuess function which is the gameplay loop for Computer game, passes in secret number and upperbound as an arg so the function can use it
    await computerGuess(upperBound, secretNumber);
    //If user chooses human game
  } else if (whatGame === "H") {
    //Log beggening message
    console.log(
      "Let's play a game where I (computer) make up a number and you (Human) try to guess it."
    );
    // await humanGuess (gameplay loop for human game ) pass in upperbound don't need secret number because human is guessing the number
    await humanGuess(upperBound);
    process.exit();
  }
}

async function computerGuess(upperBound, num) {
  // Initializing while loop variables
  let indexStart = 0;
  let indexEnd = upperBound;
  let playAgain;
  //counter so we can tell guesses at the end of the game
  let guessCount = 0;
  //Middle is the middle of the guess range
  let middle;

  // gameplay loop incorporating binary search
  while (middle !== num) {
    // adding one to the count at the start of loop
    guessCount++;
    //Check to see if user has exceed the maximum number of guesses possible
    if (guessCount > Math.log2(parseInt(upperBound)) + 1) {
      //if so they cheated
      console.log("You cheated");
      process.exit();
    }

    //Setting middle to be equally between index end and index start
    middle = Math.floor(indexStart + (indexEnd - indexStart) / 2);

    // get Higher or lower string
    item = await inputSan(
      await ask(
        `Is your number ${middle} (C) ? Is it higher (H) or lower (L) than ${middle}? `
      ),
      ["H", "L", "C"]
    );

    //Conditional to check if its higher,lower, or correct
    if ("C" === item) {
      //See if user lied when saying correct
      if (parseInt(num) !== middle) {
        console.log("You cheated");
        process.exit();
      }
      //logs saying ending message and how mnay guesses it took
      console.log("Nice I won");
      console.log(`that took ${guessCount} guesses`);
      // if correct ask() if user wants to replay the game
      playAgain = await inputSan(
        await ask("Would you like to play again? (Y/ N)"),
        ["Y", "N"]
      );
      //if Y
      if (playAgain === "Y") {
        //Start game again
        start();
      } else {
        //otherwise end game
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
      guessCount--;
      console.log("Please enter a valid input");
    }
  }
}

//Gameplay loop for human game
async function humanGuess(upperBound) {
  //Get random number for secret number using the upperBound user inputed in start
  let secretNumber = randomNumGen(1, upperBound);
  //Ask human for guess
  let humanGuess = await inputSan(await ask("Whats your guess?"), ["number"]);

  // gameplay loop for second game
  while (humanGuess !== secretNumber.toString()) {
    // if humanguess less than secret number tell user higher
    if (humanGuess < secretNumber) {
      console.log(`Nope its higher than ${humanGuess}`);
      // if humanguess higher than secret number tell user secret number is lower
    } else if (humanGuess > secretNumber) {
      console.log(`Nope its lower than ${humanGuess}`);
    }
    //ask for humanguess at end of loop
    humanGuess = await inputSan(await ask("Whats your guess?"), ["number"]);
  }
  //once user guesses correctly congratualate them for winning
  console.log("Congrats you won!");
}

async function inputSan(userInput, requires) {
  //if require array has number in it
  if (requires.includes("number")) {
    //While userinput is not a number or nothing (user inputs enter)
    while (isNaN(userInput) === true || userInput === "") {
      //ask them to enter a valid number set input to userinput
      userInput = await ask("please enter a valid number!");
    }
    //if string
  } else {
    //While requires doesn't have user input in it
    while (requires.includes(userInput) === false) {
      //Ask for new input
      userInput = await ask("Please enter a valid input!");
    }
  }
  //Return new sanitized userInput
  return userInput;
}
