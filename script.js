const board = document.getElementById('board');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameBtn = document.getElementById('new-game-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

function checkDraw() {
  return !gameBoard.includes('');
}

function handleClick(index) {
  if (!gameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  document.getElementById(`cell-${index}`).innerText = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    endGame(`Player ${winner} wins!`);
  } else if (checkDraw()) {
    endGame('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function initializeBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

function endGame(result) {
  gameActive = false;
  resultMessage.textContent = result;
  resultScreen.style.display = 'flex';
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  resultScreen.style.display = 'none';

  // Clear board
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
  });
}

initializeBoard();
