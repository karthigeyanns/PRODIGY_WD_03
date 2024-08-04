const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const resetScoreButton = document.getElementById('resetScoreButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        updateScore();
        setTimeout(() => alert(`${getCurrentPlayerName()} wins!`), 10);
        return;
    }

    if (!board.includes('')) {
        isGameActive = false;
        setTimeout(() => alert('Draw!'), 10);
        return;
    }
};

const updateScore = () => {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXDisplay.textContent = `${getCurrentPlayerName('X')}: ${scoreX}`;
    } else {
        scoreO++;
        scoreODisplay.textContent = `${getCurrentPlayerName('O')}: ${scoreO}`;
    }
};

const getCurrentPlayerName = (player = currentPlayer) => {
    return player === 'X' ? playerXInput.value : playerOInput.value;
};

const highlightWinningCells = (winningCells) => {
    winningCells.forEach(index => {
        cells[index].classList.add('highlight');
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
    });
};


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);