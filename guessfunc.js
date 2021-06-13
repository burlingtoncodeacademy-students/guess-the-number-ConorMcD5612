const { create } = require("domain");
const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

// async function createGameArray(end){
//     let gameArray = []
//     let upperBound  = await ask('How many numbers would you like to use?')

//     for (let i = 1; i <= parseInt(upperBound); i++) {
//         gameArray.push(i);
//       }

//   return new Promise((resolve, reject) => {
//     gameArray.pop(end, resolve);
// })


let gameArray = (q) =>{
  let q  = await ask('How many numbers would you like to use?')

  for (let i = 1; i <= parseInt(q); i++) {
            gameArray.push(i);
           }

}

async function start() {
  // Setting range
  createGameArray();
  console.log(createGameArray());


  // let maxGuesses = Math.log2(parseInt(upperBound))+1
  //Beggining message
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  // Let user input their secretnumber
  // let secretNumber = await ask(
  //   "What is your secret number?\nI won't peek, I promise...\n"
  // );
  console.log("hi");
  binarySearch(0, createGameArray());
}

async function binarySearch(indexStart, indexEnd) {
  while (indexStart <= indexEnd) {
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
      process.exit();
    } else if (item === "L") {
      indexEnd = middle - 1;
    } else if (item === "H") {
      indexStart = middle + 1;
    } else {
      console.log("Please enter a valid input");
    }
  }
}

