const markMap = {
    0 : ['l_c', 't_r', 'l_d'],
    1 : ['m_c', 't_r'],
    2 : ['r_c', 't_r', 'r_d'],

    3 : ['l_c', 'm_r'],
    4 : ['m_c', 'm_r', 'l_d', 'r_d'],
    5 : ['r_c', 'm_r'],

    6 : ['l_c', 'b_r', 'r_d'],
    7 : ['m_c', 'b_r'],
    8 : ['r_c', 'b_r', 'l_d'],
}

let winningWays = {
    'l_c' : 0,
    'm_c' : 0,
    'r_c' : 0,

    't_r' : 0,
    'm_r' : 0,
    'b_r' : 0,

    'l_d' : 0,
    'r_d' : 0
}

let turn = 0;
let placedMarks = 0;
let gameEnded = false;

let wins = [0,0];

const marks = {
    0 : 'X',
    1 : 'O'
}

const cells = document.getElementsByTagName('td');
const infoTop = document.getElementById('info-top');
const display = infoTop.querySelector('h2');
const mark = infoTop.querySelector('h1');

document.addEventListener('DOMContentLoaded', ()=>{
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetGame);
    for(let i = 0; i < cells.length; i++){
        const button = cells[i].querySelector('button');
        button.addEventListener('click', ()=>{
            selectCell(i);
        });
    }
});

function assignButton(idx){
    const button = cells[idx].querySelector('button');
    button.addEventListener('click', ()=>{
        selectCell(idx);
    });
}

function resetGame(){
    turn = 0;
    placedMarks = 0;
    gameEnded = false;

    display.innerHTML = `Current Turn: Player 1`;
    mark.innerHTML = `${marks[0]}`;
    for(const way in winningWays){
        winningWays[way] = 0;
    }
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = '<button> X </button>';
        assignButton(i);
    }
}

function updateScoreBoard(){
    const scoreBoard = document.getElementById('scoreboard');
    const scores = scoreBoard.getElementsByTagName('h3');
    scores[0].innerHTML = `Player 1 (X): ${wins[0]}`;
    scores[1].innerHTML = `Player 2 (O): ${wins[1]}`;
}

function passTurn(){
    turn = (turn + 1) % 2;
    display.innerHTML = `Current Turn: Player ${turn + 1}`;
    mark.innerHTML = `${marks[turn]}`;
}

function endGame(winner){
    if(winner == -1){
        console.log("DRAW");
        return;
    }
    gameEnded = true;
    wins[turn] += 1;
    updateScoreBoard();

    console.log(`${marks[turn]} is the winner`)
}

function checkBoard(cell){
    const m = markMap[cell];
    const val = turn == 0 ? 1 : -1;
    placedMarks++;
    for(let i = 0; i < m.length; i++){
        winningWays[m[i]] += val;
        if(winningWays[m[i]] == (3 * val)){
            endGame(turn);
            return true;
        }
    }
    return false;
}

function selectCell(cell){
    if(gameEnded) return;

    const col = cell % 3;
    const row = Math.floor(cell / 3);
    
    const targetCell = document.getElementById(`${cell}`);
    targetCell.innerHTML = marks[turn];

    if(!checkBoard(cell)){
        if(placedMarks == 9)
            endGame(-1);
        else
            passTurn();
    }

    console.log(`${col},${row}`);
}