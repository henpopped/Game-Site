document.addEventListener('DOMContentLoaded', function() {
    generateGrid();

    document.getElementById('reset-button').addEventListener('click', generateGrid);
    document.getElementById('check-button').addEventListener('click', checkPuzzle);
    document.getElementById('solve-button').addEventListener('click', solvePuzzle);
});

let currentDifficulty = 'easy';
let currentPuzzleIndex = 0;

const puzzles = {
    easy: [
        { start: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" },
        { start: "600120384008459072000006005000264030070080006940003000310000050089700000502000190", solution: "695127384138459672247836915851264739372981546946573821314698257489725163562341798" },
        { start: "480300000000000071020000065003060000000957000000080400350000010210000600000004028", solution: "486391257957246381123875965843162579629957134571683492354728916218439657796514328" },
        { start: "050060008609000501070010060000605000043000690000203000060090030907000204800020010", solution: "354962178689374521172518369218645937543781692796233845461897253937456284825129416" },
        { start: "002008050000070109060320070700000008016000740300000006030084010901050000080100400", solution: "472698351538471629169325874725916438816543792394237516637984215941752863285169437" },
    ],
    medium: [
        { start: "200080300060070084030500209000105408000000000402706000301007040720040060004010003", solution: "245981376169273584837564219976135428513428697482796135391657842728349561654812793" },
        { start: "300000809048720100000004050800370004010060070700048006030800020005030910604000003", solution: "376615849548729163192384657829371534413562978765948216937856421285437916614293785" },
        { start: "100920000524010000000000070050008102000000000402700090060000000000060945000019006", solution: "187923564524816739396547271659438182713692458482751693261375948738264915945189326" },
        { start: "007050400080001002030000050010030080000907000070040090020000010100800070003070900", solution: "967352418485691732231784659514236987328917546679845293826539174142868375793471826" },
        { start: "050702003002850709000001080023000000000000000000000920010400000804015300300208040", solution: "158792463462853719937641285623579841519384672748126953215437896894615327376928154" },
    ],
    hard: [
        { start: "000000907000420180000705026100904000050000040000507009920108000034059000507000000", solution: "468231957395426178271895326186974532759683241243517689927148563634759812517362494" },
        { start: "000060000080400000003008020600000570000709000045000006030900400000003010000050000", solution: "512367849789425361463198725298134576176589234345271986631942457827643519954856172" },
        { start: "300000540100000600070800000000430800000000000008059000000005090006000003054000007", solution: "389276541142593678675841329961432855237618494418759236823165790796324183554987162" },
        { start: "000040100040002080002060300000000004070010020500000000003070800060500070008090000", solution: "356849217941752683782163549219385764874916325563274198123478956697531472458692731" },
        { start: "500080000000001079000000400003050200010000080002030700001000000730800000000070006", solution: "546289317328641579197523468473956281615478923982137654261394785734815692859762136" },
    ]
};


function getRandomPuzzle(difficulty) {
    const puzzlesByDifficulty = puzzles[difficulty];
    const randomIndex = Math.floor(Math.random() * puzzlesByDifficulty.length);
    currentDifficulty = difficulty;
    currentPuzzleIndex = randomIndex;
    return puzzlesByDifficulty[randomIndex];
}

function generateGrid() {
    const difficulty = prompt("Please select a difficulty: easy, medium, or hard") || 'easy';
    const puzzle = getRandomPuzzle(difficulty);

    const board = document.getElementById('sudoku-board');
    board.innerHTML = '';

    let puzzleIndex = 0;
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.className = 'sudoku-cell';
            input.dataset.row = row;
            input.dataset.col = col;

            const value = puzzle.start.charAt(puzzleIndex);
            if (value !== "0") { 
                input.value = value;
                input.readOnly = true;
            }

            puzzleIndex++;

            td.appendChild(input);
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}

function getCurrentPuzzleSolution() {
    return puzzles[currentDifficulty][currentPuzzleIndex].solution;
}

function checkPuzzle() {
    const inputs = document.querySelectorAll('.sudoku-cell');
    let isValid = true;
    let isComplete = true;
    const solution = getCurrentPuzzleSolution(); 

    inputs.forEach((input, index) => {
        const expectedValue = solution.charAt(index);
        
        if (!validateNumber(input)) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        if (input.value !== expectedValue && expectedValue !== "0") {
            isComplete = false;
            if(input.value !== "") {
                input.classList.add('error');
            }
        }
    });

    if (isComplete && isValid) {
        alert('Congratulations! Puzzle is correctly solved.');
    } else if (!isValid) {
        alert('Some numbers violate Sudoku rules.');
    } else {
        alert('The puzzle is not correctly solved yet.');
    }
}

function validateNumber(input) {
    const value = parseInt(input.value, 10);
    if (isNaN(value)) return true;
    const row = input.dataset.row;
    const col = input.dataset.col;

    const inputs = document.querySelectorAll('.sudoku-cell');
    for (let i = 0; i < inputs.length; i++) {
        const otherInput = inputs[i];
        if (otherInput !== input) {
            if (otherInput.dataset.row === row || otherInput.dataset.col === col) {
                if (parseInt(otherInput.value, 10) === value) {
                    return false;
                }
            }
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            const otherInput = document.querySelector(`.sudoku-cell[data-row="${r}"][data-col="${c}"]`);
            if (otherInput !== input && parseInt(otherInput.value, 10) === value) {
                return false;
            }
        }
    }

    return true;
}

function solvePuzzle() {
    const board = []; 
    const inputs = document.querySelectorAll('.sudoku-cell');

    inputs.forEach(input => {
        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);
        if (!board[row]) {
            board[row] = [];
        }
        board[row][col] = input.value ? parseInt(input.value, 10) : 0;
    });

    if (solve(board)) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                inputs.forEach(input => {
                    if (parseInt(input.dataset.row, 10) === row && parseInt(input.dataset.col, 10) === col) {
                        input.value = board[row][col];
                    }
                });
            }
        }
        alert('Puzzle solved!');
    } else {
        alert('No solution exists for the given Sudoku.');
    }
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidPlacement(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0; 
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValidPlacement(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == num || board[row][i] == num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] == num) {
                return false;
            }
        }
    }
    return true;
}

