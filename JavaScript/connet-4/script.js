const board = document.getElementById("gameBoard");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const resetButton = document.getElementById("reset");

let currentPlayer = 1; // 1 for Red, 2 for Yellow
let gameBoard = Array(6).fill(null).map(() => Array(7).fill(0)); // 6x7 board initialized to 0
let gameOver = false;

// Initialize the game board
function createBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.classList.add('cell');
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

// Handle player move
function handleCellClick(e) {
    if (gameOver) return;
    const col = parseInt(e.target.dataset.col);

    // Find the first empty row in the clicked column
    for (let row = 5; row >= 0; row--) {
        if (gameBoard[row][col] === 0) {
            gameBoard[row][col] = currentPlayer;
            updateBoard();
            checkWin(row, col);
            switchPlayer();
            return;
        }
    }
}

// Update the visual board
function updateBoard() {
    const cells = board.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (gameBoard[row][col] === 1) {
            cell.classList.add('player-one');
            cell.classList.remove('player-two');
        } else if (gameBoard[row][col] === 2) {
            cell.classList.add('player-two');
            cell.classList.remove('player-one');
        }
    });
}

// Switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerDisplay.textContent = `Player ${currentPlayer} (${currentPlayer === 1 ? 'Red' : 'Yellow'})`;
}

// Check if a player has won
function checkWin(row, col) {
    if (checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal \
        checkDirection(row, col, 1, -1)) { // Diagonal /
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameBoard.flat().every(cell => cell !== 0)) {
        // Check for tie
        gameOver = true;
        alert("It's a tie!");
    }
}

// Check for 4 connected cells in a given direction
function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    let r = row;
    let c = col;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }

    r = row - rowDir;
    c = col - colDir;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard[r][c] === currentPlayer) {
        count++;
        r -= rowDir;
        c -= colDir;
    }

    return count >= 4;
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameBoard = Array(6).fill(null).map(() => Array(7).fill(0));
    gameOver = false;
    currentPlayer = 1;
    currentPlayerDisplay.textContent = "Player 1 (Red)";
    createBoard();
});

// Start the game
createBoard();
