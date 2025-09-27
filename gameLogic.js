const marks = {
    0 : 'X',
    1 : 'O'
}

const socket = new WebSocket("ws://localhost:8001/");
const cells = document.getElementsByTagName('td');
const infoTop = document.getElementById('info-top');
const display = infoTop.querySelector('h2');
const markDisplay = infoTop.querySelector('h1');

document.addEventListener('DOMContentLoaded', ()=>{
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', ()=>{
        sendMessage({
            type : "reset"
        });
    });

    for(let i = 0; i < cells.length; i++){
        assignButton(i);
    }
    
    receiveMoves();
});

function assignButton(idx){
    const button = cells[idx].querySelector('button');
    button.addEventListener('click', ()=>{
        sendMessage({
            type : "play",
            cell : idx
        });
    });
}

function sendMessage(message){
    socket.send(JSON.stringify(message));
}

function receiveMoves(){
    socket.addEventListener("message", ({ data })=>{
        const event = JSON.parse(data);
        switch(event.type){
            case "reset":
                _onResetGame();
                break;
            case "play":
                const cell = event.cell;
                const mark = event.player == "X" ? "X" : "O";
                _onSelectCell(cell, mark);
                updateNextPlayerDisplay(event.player);
                break;
            case "result":
                const winner = event.winner;
                const player = winner == "X" ? "Player 1" : "Player 2";

                const displayText = winner == "none" ? `Draw` : `${player} is the Winner!`
                const markText = winner == "none" ? `:/` : winner;

                display.innerHTML = displayText;
                markDisplay.innerHTML = markText;

                updateScoreBoard(event.p1_wins, event.p2_wins);
                break;
            case "error":
                console.log(event.message);
                break;
        }
        console.log(event);
    });
}


function _onResetGame(){
    display.innerHTML = `Current Turn: Player 1`;
    markDisplay.innerHTML = `${marks[0]}`;
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = '<button> X </button>';
        assignButton(i);
    }
}

function updateScoreBoard(player1Wins, player2Wins){
    const scoreBoard = document.getElementById('scoreboard');
    const scores = scoreBoard.getElementsByTagName('h3');
    scores[0].innerHTML = `Player 1 (X): ${player1Wins}`;
    scores[1].innerHTML = `Player 2 (O): ${player2Wins}`;
}

function updateNextPlayerDisplay(lastPlayer){
    const nextIdx = lastPlayer == "X" ? 1 : 0
    display.innerHTML = `Current Turn: Player ${nextIdx + 1}`;
    markDisplay.innerHTML = `${marks[nextIdx]}`;
}

function _onEndGame(winner, player1Wins, player2Wins){
    updateScoreBoard(player1Wins, player2Wins);
    console.log(`${winner} is the winner`)
}

function _onSelectCell(cell, mark){
    const targetCell = document.getElementById(`${cell}`);
    targetCell.innerHTML = mark;
}