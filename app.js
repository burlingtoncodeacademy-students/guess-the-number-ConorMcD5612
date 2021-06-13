const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let gameArray = (q) => {
  let q = await ask("How many numbers would you like to use?");

  for (let i = 1; i <= parseInt(q); i++) {
    gameArray.push(i);
  }
  return q;
};

gameArray()