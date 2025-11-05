const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));
resetBtn.addEventListener('click', restartGame);

function cellClicked() {
  const index = this.dataset.index;

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  // Add pop-in animation
  this.style.transform = "scale(1.2)";
  setTimeout(() => this.style.transform = "scale(1)", 150);

  // Play click sound
  clickSound.play();

  checkWinner();
}

function checkWinner() {
  let won = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      highlightCells(pattern);
      break;
    }
  }

  if (won) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    winSound.play();
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "😅 It's a draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function highlightCells(pattern) {
  pattern.forEach(i => {
    cells[i].style.background = "rgba(255,255,255,0.7)";
    cells[i].style.color = "#333";
    cells[i].style.transform = "scale(1.1)";
  });
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.textContent = `Player X's turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.background = "rgba(255, 255, 255, 0.2)";
    cell.style.color = "#fff";
    cell.style.transform = "scale(1)";
  });
}
