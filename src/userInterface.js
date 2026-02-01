import { GameBoard } from "./classes.js";

export function loadInitialPage() {
    const mainBody = document.querySelector(".main-body");
    mainBody.innerHTML = "";

    const nameBody = document.createElement("div");
    nameBody.className = "nameBody";

    const title = document.createElement("h2");
    title.className = "nameInputTitle"
    title.textContent = "Welcome to Battleship!";

    const inputBody = document.createElement("div");
    inputBody.className = "inputBody";

    const label = document.createElement("label");  
    label.className = "nameLabel";
    label.textContent = "Enter your name:";
    label.htmlFor = "nameInput";

    const nameInput = document.createElement("input");
    nameInput.id = "nameInput";
    nameInput.type = "text";
    nameInput.placeholder = "Your name";
    nameInput.required = true;

    const startBtn = document.createElement("button");
    startBtn.className = "nameStartBtn";
    startBtn.textContent = "Start";
    startBtn.addEventListener("click", () => {
        const playerName = nameInput.value.trim();
        if (playerName) {
            loadPlayerBoard(playerName);
        } else {
            alert("Please enter your name!");
        }
    })

    inputBody.appendChild(label);
    inputBody.appendChild(nameInput);

    nameBody.appendChild(title);
    nameBody.appendChild(inputBody);
    nameBody.appendChild(startBtn);

    mainBody.appendChild(nameBody);
}

function loadPlayerBoard(player1) {
    const mainBody = document.querySelector(".main-body");
    mainBody.innerHTML = "";

    const boardsContainer = document.createElement("div");
    boardsContainer.className = "boards-container";

    const names = document.createElement("div");
    names.className = "playerNames";

    const player1Name = document.createElement("h2");
    player1Name.className = "player1Name";
    player1Name.textContent = player1;

    const player2Name = document.createElement("h2");
    player2Name.className = "player2Name";
    player2Name.textContent = "Computer";

    const player1BoardBody = document.createElement("div");
    player1BoardBody.className = "player1Board";

    const player2BoardBody = document.createElement("div");
    player2BoardBody.className = "player2Board";

    names.appendChild(player1Name);
    names.appendChild(player2Name);

    boardsContainer.appendChild(player1BoardBody);
    boardsContainer.appendChild(player2BoardBody);

    mainBody.appendChild(names);
    mainBody.appendChild(boardsContainer);

    const player1Board = new GameBoard();
    const player2Board = new GameBoard();

    renderBoard(player1Board, player1BoardBody);
    renderBoard(player2Board, player2BoardBody);
}

function renderBoard(gameBoard, container) {
    gameBoard.board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const square = document.createElement("div");
            square.className = "square";
            square.dataset.row = rowIndex;
            square.dataset.col = colIndex;
            container.appendChild(square);  
        }) 
    })
}