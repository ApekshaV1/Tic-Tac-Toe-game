const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer='x';
let board = ['','','','','','','','',''];
let gameActive = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => cell.addEventListener('click',handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event){
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if(board[index] !== '' || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkWinner();
}

function checkWinner(){
    let roundWon = false;
    for(let i=0; i<winningConditions.length; i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if(a === '' || b==='' || c===''){
            continue;
        }
        if(a=== b && b===c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        statusText.classList.add('winner');
        gameActive = false;
        
    }

    else if(!board.includes('')){
        statusText.textContent = 'Draw!';
        statusText.classList.add('draw');
        gameActive = false;
        
    }

    else{
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
        statusText.classList.remove('winner', 'draw');
    }
    
}

function resetGame(){
    currentPlayer='x';
    board = ['','','','','','','','',''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.classList.remove('winner', 'draw');
    cells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
}