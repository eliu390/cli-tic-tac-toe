const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const defaultBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const state = {};

const displayBoard = () => {
  const rows = [
    `-------------------`,
    `|     |     |     |`,
    `|  ${state.board[0][0]}  |  ${state.board[0][1]}  |  ${state.board[0][2]}  |`,
    `|     |     |     |`,
    `-------------------`,
    `|     |     |     |`,
    `|  ${state.board[1][0]}  |  ${state.board[1][1]}  |  ${state.board[1][2]}  |`,
    `|     |     |     |`,
    `-------------------`,
    `|     |     |     |`,
    `|  ${state.board[2][0]}  |  ${state.board[2][1]}  |  ${state.board[2][2]}  |`,
    `|     |     |     |`,
    `-------------------`,
  ];
  console.log(rows.join('\n'));
}

const pollUser = () => {
  rl.question(`${state.currentTurn}'s move (enter a number): `, (userInput) => {
    const input = Number(userInput);
    if (input === NaN || input <= 0 || input > 9 || (input % 1 !== 0)) {
      console.log('Invalid input! Please enter a number (1-9)...');
      pollUser();
    } else {
      const row = Math.floor((input - 1) / 3);
      const col = (input - 1) % 3;
      console.log(`row: ${row}, col: ${col}`);

      if (typeof state.board[row][col] !== 'number') { // invalid input
        console.log('Square occupied!');
        pollUser();
      } else {
        makeMove(row, col);
        pollUser();
      }
    }
  });
}

const makeMove = (row, col) => {
  state.board[row][col] = state.currentTurn;
  displayBoard();
  if (state.currentTurn === 'O') {
    state.currentTurn = 'X';
  } else {
    state.currentTurn = 'O';
  }
  checkWin(row, col);
}

const checkWin = (row, col) => {
  if (state.board[row][0] === state.board[row][1] && state.board[row][0] === state.board[row][2]) {
    console.log(`${state.board[row][0]} wins!`);
    startGame();
    return;
  }
  
  if (state.board[0][col] === state.board[1][col] && state.board[0][col] === state.board[2][col]) {
    console.log(`${state.board[0][col]} wins!`);
    startGame();
    return;
  }
  
  if (row === col) {
    if (state.board[0][0] === state.board[1][1] && state.board[0][0] === state.board[2][2]) {
      console.log(`${state.board[0][0]} wins!`);
      startGame();
      return;
    }
  }
  
  if (row + col === 2) {
    if (state.board[0][2] === state.board[1][1] && state.board[0][2] === state.board[2][0]) {
      console.log(`${state.board[0][2]} wins!`);
      startGame();
      return;
    }
  }
}

const startGame = () => {
  rl.question(`Hit enter to start a game...`, (input) => {
    state.board = JSON.parse(JSON.stringify(defaultBoard));
    state.currentTurn = 'O';
    displayBoard();
    pollUser();
  });
}

startGame();

rl.on("close", function () {
  console.log("\nGame Over...");
  process.exit(0);
});