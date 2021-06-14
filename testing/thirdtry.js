

const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// function randomNumGen(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }



start();

async function start() {
  // Setting range
  
  let upperBound  = await ask('How many numbers would you like to use?')
  console.log(upperBound)
  // let maxGuesses = Math.log2(parseInt(upperBound))+1
  //Beggining message
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  // Let user input their secretnumber
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);

  let gameArray = [];


  // Making game array
  for (let i = 1; i <= parseInt(upperBound); i++) {
    gameArray.push(i);
  }

  // Binary search vars
  indexStart = 0;
  indexEnd = gameArray.length - 1;

  // for(let guessCount = 0; (guessCount < maxGuesses) && (guessCount%2==0); guessCount++){
  //   guessCount++;
  //   console.log(guessCount)
  // }

  let playAgain;

  
  i = 0
  while (indexStart <= indexEnd) {
    i++;
    middle = Math.floor(indexStart + (indexEnd - indexStart) / 2);
    middleVal = gameArray[middle];

    // get Higher or lower string
    item = await ask(
      `Is your number ${middleVal}? Is it higher or lower than ${middleVal}? `
    );

    console.log(item);
    console.log(middleVal);
    
    // if(gameArray ){
    //   console.log("No cheating ):<")
    // }

    

    if ("C" === item) {
      console.log("Nice I won");
      console.log(`that took ${i} guesses`)
      playAgain = await ask('Would you like to play again?')
      if( playAgain === 'Y'){
       
        start()
      } else {
        process.exit()
      }
      

    } else if (item === "L") {
      indexEnd = middle - 1;
      
    } else if (item === "H") {
      indexStart = middle + 1;
      
    } else {
      i--;
      console.log("Please enter a valid input");
    }

    
    
  }

  if (indexStart !== secretNumber){
    console.log('You cheated')
    
    process.exit()
  }

  console.log(indexStart)
  console.log(indexEnd)
  
  // Play again 
  // let playAgain = await ask('Would you like to play again?')

  //  if (playAgain === 'Y'){
  //   start();
  // }

}


// [log2(upperBound)+1]