const readline = require("readline");
const { start } = require("repl");
const rl = readline.createInterface(process.stdin, process.stdout);


// prompt user with question func
function ask(questionText) {
    return new Promise((resolve, reject) => {
      rl.question(questionText, resolve);
    });
  };


//Goal is to make game but this time without arrays

// Computer game function

// async function start(){
//     let whatGame = await ask(
//         "Would you, the human (H) like to guess my secret number? Or should I the computer (C) guess yours?"
//       ); 

      
//     let upperBound = await ask("How many numbers would you like to use?");
// }


// computerGuess()

// async function computerGuess(){
    
//     let indexEnd = 0;
//     let indexStart = 100;
//     let guess = indexStart/2;
//     let answer = await ask(`Is your number ${guess} (C) ? Is it higher (H) or lower (L) than ${guess}?`)
//     while (answer !== 'c'){
//         if(answer === 'l'){
//             indexEnd = guess-1;
//         } else if (answer === 'h'){
//             indexStart = guess + 1;
//         } else {
//             console.log('please enter a valid input')
//         }
//     guess =
//     answer = await ask(`Is your number ${guess} (C) ? Is it higher (H) or lower (L)`)
//     }
// }

// Going to need a input sanatization function 
// Needs to be put into lowercase for strings, needs to check if the input is a num when it should be.

// Ill worry about this later

// function sanatize(){
//     if (this ===)
// }
computerGuess()

async function computerGuess(upperBound) {
    
  
    // Initializing while loop variables
    let indexStart = 0;
    let indexEnd = 100;
    let playAgain;
    let guessCount = 0;
  
    // gameplay loop incorporating binary search
    while (middle !== secretNumber) {
      // adding one to the count at the start of loop
      guessCount++;
      middle = Math.floor(indexStart + (indexEnd - indexStart) / 2);
      
  
      // get Higher or lower string
      item = await ask(
        `Is your number ${middle} (C) ? Is it higher (H) or lower (L) than ${middle}? `
      );
  
      //Conitional to check if its higher,lower, or correct
      if ("C" === item) {
        // if correct ask() if user wants to replay the game
        console.log("Nice I won");
        console.log(`that took ${guessCount} guesses`);
        playAgain = await ask("Would you like to play again?");
        if (playAgain === "Y") {
          start();
        } else {
          process.exit();
        }
        // if lower change the end of the index to be guess -1
      } else if (item === "L") {
        indexEnd = middle;
      }
      // if higher change start of index to be guess+1
      else if (item === "H") {
        indexStart = middle;
      }
      // if invalid input restart loop and take -1 the iterator
      else {
        guessCount--;
        console.log("Please enter a valid input");
      }
    }
  }

  async function inputSan(userInput, requires){
      //TODO Things to input san (whatGame, upperBound, SecretNumber, Human guess)
      while(requires.includes(userInput) === false){
        await ask('Please enter a valid input!')
      }
      return userInput
  }

  
