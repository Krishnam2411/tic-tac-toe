const boxes = document.querySelectorAll(".inner-box");
const restart = document.querySelector("#restart");
const statusText = document.querySelector("#status");
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let stop = true;
const winningCondition = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]]

alertBox("TIC-TAC-TOE","Let's Play", initiate());

function initiate(){
    stop = false;
    statusText.innerHTML = `Player ${currentPlayer}'s turn`;
    boxes.forEach(e => {
        e.addEventListener('click', boxClicked)
    });
    restart.addEventListener('click', reset);
    restart.disabled = true;
}
function boxClicked() {
    restart.disabled = false;
    let i = this.getAttribute("index");
    if(board[i] != "" || stop == true){
        return;
    }
    updateBox(i, this);
    checkWinner();
}
function checkWinner(){
    let Win = false;
    for (let j = 0; j < winningCondition.length; ++j)
    {
        let x1 = board[winningCondition[j][0]];
        let x2 = board[winningCondition[j][1]];
        let x3 = board[winningCondition[j][2]];
        if(x1 == "" || x2 == "" || x3 == ""){
            continue;
        }
        if(x1 == x2 && x2 == x3){
            Win = true;
            break;
        }
    }
    if(Win){
        stop = true;
        statusText.textContent = '';
        alertBox(`Player ${currentPlayer}'s wins!`,"Play Again", reset());
    }
    else if(!board.includes("")){
        stop = true;
        statusText.textContent = "";
        alertBox("DRAW!","Play Again", reset());
    }
    else {
        changePlayer();
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        return;
    }
}
function updateBox(index, x){
    board[index] = currentPlayer;
    x.textContent = currentPlayer;
}
function changePlayer(){
    if(currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
}
function reset(){
    for(let j = 0; j < 9; ++j)
    {
        board[j] = "";
    }
    boxes.forEach(e => {e.textContent = ""});
    initiate();
}
function alertBox(message, buttonMsg, func){
    const popup = document.createElement('div');
    const popupButton = document.createElement('button');
    popup.classList.add('popup');
    popupButton.textContent = buttonMsg;
    popup.innerHTML = `${message}`;
    popup.appendChild(popupButton);
    popupButton.addEventListener('click', () => {
        popup.remove();
        func();
    })
    document.body.appendChild(popup);
}