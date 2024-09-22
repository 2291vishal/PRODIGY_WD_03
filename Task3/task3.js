// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('game-board');
    const winningMessageElement = document.getElementById('winningMessage');
    const winningMessageTextElement = document.getElementById('winningMessageText');
    const restartButton = document.getElementById('restartButton');
    const playAgainButton = document.getElementById('playAgainButton');
    let circleTurn; // To keep track of whose turn it is (X or O)

    // Possible winning combinations
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Start a new game
    startGame();

    // Event listener to restart the game
    restartButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', startGame);

    function startGame() {
        circleTurn = false; // X goes first
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('circle');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true }); // Ensure each cell can only be clicked once
        });
        winningMessageElement.classList.remove('show');
    }

    // Handle click event on a cell
    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? 'circle' : 'x';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    // Place the mark (X or O)
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    // Add the mark (X or O) and change the cell's background color
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass); // Add the class to change background color
    }

    // Swap turns between X and O
    function swapTurns() {
        circleTurn = !circleTurn;
    }

    // Check if the current player has won
    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    // End the game with either a win or a draw
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = "It's a Draw!";
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageElement.classList.add('show');
    }

    // Check if the game is a draw (all cells filled and no winner)
    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('circle');
        });
    }
});
