// filepath: /Users/idris/Documents/tic/script.js
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const aiToggle = document.getElementById('aiToggle');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diags
];

function renderBoard() {
  board.forEach((val, idx) => {
    cells[idx].textContent = val;
    cells[idx].className = 'cell' + (val ? ' ' + val : '');
  });
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      pattern.forEach(i => cells[i].classList.add('winner'));
      gameActive = false;
      message.textContent = `${board[a]} wins!`;
      return true;
    }
  }
  if (!board.includes('')) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }
  return false;
}

function handleCellClick(e) {
  const idx = +e.target.dataset.index;
  if (!gameActive || board[idx]) return;
  board[idx] = currentPlayer;
  renderBoard();
  if (checkWinner()) return;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer}'s turn`;
  if (aiToggle.checked && currentPlayer === 'O' && gameActive) {
    setTimeout(aiMove, 400);
  }
}

function aiMove() {
  // Simple AI: pick random empty cell
  const empty = board.map((v,i) => v === '' ? i : null).filter(i => i !== null);
  if (empty.length === 0) return;
  const idx = empty[Math.floor(Math.random() * empty.length)];
  board[idx] = 'O';
  renderBoard();
  if (checkWinner()) return;
  currentPlayer = 'X';
  message.textContent = "X's turn";
}

function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = "X's turn";
  cells.forEach(cell => cell.classList.remove('winner'));
  renderBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
aiToggle.addEventListener('change', restartGame);

restartGame();