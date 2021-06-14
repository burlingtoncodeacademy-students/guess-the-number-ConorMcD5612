


const readline = require("readline");
const { start } = require("repl");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}


function randomNumGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}





async function humanGuess(){
  console.log('Let\'s play a game where I (computer) make up a number and Iyou (Human) try to guess it.')
  
  let secretNumber = randomNumGen(1, 100)
  let humanGuess = await ask('Whats your guess?')
  

  while (humanGuess !== secretNumber){
     
    console.log(secretNumber)
    if (humanGuess < secretNumber){
      console.log(`Nope its higher than ${humanGuess}`)
    } else if (humanGuess > secretNumber){
      console.log(`Nope its lower than ${humanGuess}`)
    } else {
      break;
    }
    humanGuess = await ask('Whats your guess?')

  }


  console.log('Congratulations you won!')

}

Game2()