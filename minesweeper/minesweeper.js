document.addEventListener('DOMContentLoaded', function() {
    const boardSize = 8;
    const mineCount = 10;
    let board, gameBoard, revealedCount;

    function initGame() {
        board = generateBoard(boardSize, mineCount);
        gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = ''; // Clear the previous board
        revealedCount = 0;

        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let cell = document.createElement('div');
                cell.id = `cell-${i}-${j}`;
                cell.className = 'cell';
                cell.addEventListener('click', function() {
                    revealCell(i, j);
                });
                cell.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    flagCell(i, j);
                });
                gameBoard.appendChild(cell);
            }
        }
    }

    function revealCell(x, y) {
        let cell = document.getElementById(`cell-${x}-${y}`);
        if (cell.classList.contains('revealed') || cell.classList.contains('flag')) {
            return;
        }
        cell.classList.add('revealed');
        revealedCount++;

        if (board[x][y] === -1) {
            cell.classList.add('mine');
            setTimeout(() => {
                alert('Game Over!');
                revealMines();
                initGame();
            }, 100);
        } else {
            cell.innerText = board[x][y] > 0 ? board[x][y] : '';
            cell.classList.add(`number-${board[x][y]}`);
            if (board[x][y] === 0) {
                revealAdjacent(x, y);
            }
        }

        if (revealedCount === boardSize * boardSize - mineCount) {
            setTimeout(() => {
                alert('Congratulations! You have won the game.');
                initGame();
            }, 100);
        }
    }

    function flagCell(x, y) {
        let cell = document.getElementById(`cell-${x}-${y}`);
        if (cell.classList.contains('revealed')) {
            return;
        }
        if (cell.classList.contains('flag')) {
            cell.classList.remove('flag');
            cell.innerHTML = '';
        } else {
            cell.classList.add('flag');
            cell.innerHTML = '🚩';
        }
    }

    function revealMines() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === -1) {
                    let mineCell = document.getElementById(`cell-${i}-${j}`);
                    if (!mineCell.classList.contains('revealed')) {
                        mineCell.classList.add('mine');
                    }
                }
            }
        }
    }

    function generateBoard(size, mineCount) {
        let board = Array.from({ length: size }, () => Array(size).fill(0));
        let minePositions = [];

        while (minePositions.length < mineCount) {
            let position = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
            if (!minePositions.some(pos => pos[0] === position[0] && pos[1] === position[1])) {
                minePositions.push(position);
                let [x, y] = position;
                board[x][y] = -1;
            }
        }

        for (let [x, y] of minePositions) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    let nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < size && ny >= 0 && ny < size && board[nx][ny] !== -1) {
                        board[nx][ny]++;
                    }
                }
            }
        }

        return board;
    }

    function revealAdjacent(x, y) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
                    revealCell(nx, ny);
                }
            }
        }
    }

    initGame(); // Initialize the game when the page loads
});
