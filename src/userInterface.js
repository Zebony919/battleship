import { Ship, GameBoard, Player } from "./classes.js";

let currentShip = null;
let currentOrientation = 'horizontal';
let placedShips = [];
let player1, player2;
let gameStarted = false;

const SHIPS = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 }
];

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

function loadPlayerBoard(playerName) {
    const mainBody = document.querySelector(".main-body");
    mainBody.innerHTML = "";

    const boardsContainer = document.createElement("div");
    boardsContainer.className = "boards-container";

    const names = document.createElement("div");
    names.className = "playerNames";

    const player1Name = document.createElement("h2");
    player1Name.className = "player1Name";
    player1Name.textContent = playerName;

    const player2Name = document.createElement("h2");
    player2Name.className = "player2Name";
    player2Name.textContent = "Computer";

    const player1BoardBody = document.createElement("div");
    player1BoardBody.className = "player1Board";

    const player2BoardBody = document.createElement("div");
    player2BoardBody.className = "player2Board";

    names.appendChild(player1Name);
    names.appendChild(player2Name);

    const shipSelection = loadShipSelection();

    boardsContainer.appendChild(player1BoardBody);
    boardsContainer.appendChild(shipSelection);
    boardsContainer.appendChild(player2BoardBody);

    mainBody.appendChild(names);
    mainBody.appendChild(boardsContainer);

    // Create temporary gameboards for setup phase
    const tempPlayer1Board = new GameBoard();
    const tempPlayer2Board = new GameBoard();

    // Store reference to player's board for later
    window.tempPlayer1Board = tempPlayer1Board;

    // Render boards
    renderBoard(tempPlayer1Board, player1BoardBody, true);  // Allow placement
    renderBoard(tempPlayer2Board, player2BoardBody, false); // No placement (just visual)
}

function loadShipSelection() {
    const container = document.createElement("div");
    container.className = "shipSelection";

    const title = document.createElement("h2");
    title.className = "shipSelectionTitle";
    title.textContent = "Place your Ships!";
    container.appendChild(title);

    SHIPS.forEach(ship => {
        const button = document.createElement("button");
        button.textContent = `${ship.name} (${ship.length})`;
        button.className = "shipButton";
        button.dataset.shipName = ship.name;
        
        button.addEventListener("click", () => {
            if (button.disabled) return;
            
            currentShip = ship;
            document.querySelectorAll(".shipButton").forEach(btn => {
                btn.classList.remove("selected");
            });
            button.classList.add("selected");
        });
        container.appendChild(button);
    });

    const rotateBtn = document.createElement("button"); 
    rotateBtn.textContent = "Rotate (R)";
    rotateBtn.className = "rotateButton";
    rotateBtn.addEventListener("click", toggleOrientation);
    container.appendChild(rotateBtn);

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.className = "startGameButton";
    startBtn.style.display = "none";
    startBtn.addEventListener("click", startGame);
    container.appendChild(startBtn);

    return container;
}

function toggleOrientation() {
    currentOrientation = currentOrientation === "horizontal" ? "vertical" : "horizontal";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
        toggleOrientation();
    }
});


function renderBoard(gameBoard, container, allowPlacement = false) {
    gameBoard.board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const square = document.createElement("div");
            square.className = "square";
            square.dataset.row = rowIndex;
            square.dataset.col = colIndex;

            if (allowPlacement) {
                square.addEventListener("mouseenter", () => {
                    if (currentShip) {
                        previewPlacement(container, rowIndex, colIndex, currentShip.length, currentOrientation);
                    }
                });

                square.addEventListener("mouseleave", () => {
                    clearPreview(container);
                });

                square.addEventListener("click", () => {
                    if (currentShip) {
                        placeShip(gameBoard, rowIndex, colIndex, currentShip, currentOrientation);
                        clearPreview(container);
                        currentShip = null;
                        document.querySelectorAll(".shipButton").forEach(btn => {
                            btn.classList.remove("selected");
                        })
                    }
                });
            }

            container.appendChild(square);  
        }) 
    })
}

export function previewPlacement(container, row, col, length, orientation) {
    clearPreview(container);

    for (let i = 0; i < length; i++) {
        const targetRow = orientation === 'vertical' ? row + i : row;
        const targetCol = orientation === 'horizontal' ? col + i : col;

        if (targetRow >= 10 || targetCol >= 10) {
            markPreviewInvalid(container, row, col, length, orientation);
            return;
        }

        const square = container.querySelector(
            `[data-row="${targetRow}"][data-col="${targetCol}"]`
        );

        if (square) {
            square.classList.add("ship-preview");
        }
    }
}

export function markPreviewInvalid(container, row, col, length, orientation) {
    for (let i = 0; i < length; i++) {
        const targetRow = orientation === 'vertical' ? row + i : row;
        const targetCol = orientation === 'horizontal' ? col + i : col;

        if (targetRow < 10 && targetCol < 10) {
            const square = container.querySelector(
                `[data-row="${targetRow}"][data-col="${targetCol}"]`
            );
            if (square) {
                square.classList.add("ship-preview-invalid");
            }
        }
    }
}

export function clearPreview(container) {
    container.querySelectorAll(".ship-preview, .ship-preview-invalid").forEach(sq => {
        sq.classList.remove("ship-preview", "ship-preview-invalid");
    });
}

function placeShip(gameboard, row, col, shipData, orientation) {
    // Validate placement
    for (let i = 0; i < shipData.length; i++) {
        const targetRow = orientation === 'vertical' ? row + i : row;
        const targetCol = orientation === 'horizontal' ? col + i : col;

        if (targetRow >= 10 || targetCol >= 10) {
            alert("Ship goes out of bounds!");
            return;
        }

        if (gameboard.board[targetRow][targetCol] !== null) {
            alert("Space already occupied!");
            return;
        }
    }

    // Place ship on the gameboard (this is window.tempPlayer1Board)
    const ship = new Ship(shipData.length);
    gameboard.placeShip(ship, [col, row], orientation);

    // Mark squares visually
    const container = document.querySelector(".player1Board");
    for (let i = 0; i < shipData.length; i++) {
        const targetRow = orientation === 'vertical' ? row + i : row;
        const targetCol = orientation === 'horizontal' ? col + i : col;

        const square = container.querySelector(
            `[data-row="${targetRow}"][data-col="${targetCol}"]`
        );
        if (square) {
            square.classList.add("ship-placed");
        }
    }

    // Track placed ship
    placedShips.push(shipData.name);
    
    // Disable the button for this ship
    const button = document.querySelector(`[data-ship-name="${shipData.name}"]`);
    if (button) {
        button.disabled = true;
        button.classList.add("disabled");
    }

    console.log(`Placed ${shipData.name}`);

    // Check if all ships are placed
    if (placedShips.length === SHIPS.length) {
        const startBtn = document.querySelector(".startGameButton");
        if (startBtn) {
            startBtn.style.display = "block";
        }
    }
}

function placeComputerShips(gameboard) {
    SHIPS.forEach(shipData => {
        let placed = false;
        
        while (!placed) {
            const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            
            // Check if placement is valid
            let valid = true;
            for (let i = 0; i < shipData.length; i++) {
                const targetRow = orientation === 'vertical' ? row + i : row;
                const targetCol = orientation === 'horizontal' ? col + i : col;
                
                if (targetRow >= 10 || targetCol >= 10 || 
                    gameboard.board[targetRow][targetCol] !== null) {
                    valid = false;
                    break;
                }
            }
            
            if (valid) {
                const ship = new Ship(shipData.length);
                gameboard.placeShip(ship, [col, row], orientation);
                placed = true;
                console.log(`Computer placed ${shipData.name} at [${col}, ${row}] ${orientation}`);
            }
        }
    });
}

function startGame() {
    gameStarted = true;
    
    // Create players
    player1 = new Player('real');
    player2 = new Player('computer');
    
    // Copy the temp board (with ships) to player1's actual gameboard
    player1.gameboard = window.tempPlayer1Board;
    
    // Place computer ships
    placeComputerShips(player2.gameboard);
    
    // Hide ship selection UI
    const shipSelection = document.querySelector(".shipSelection");
    if (shipSelection) {
        shipSelection.style.display = "none";
    }
    
    // Enable clicking on computer's board
    enableComputerBoardAttacks();
    
    // Show game status
    showGameStatus("Your turn! Click on the computer's board to attack.");
}

function showGameStatus(message) {
    let statusDiv = document.querySelector(".game-status");
    if (!statusDiv) {
        statusDiv = document.createElement("div");
        statusDiv.className = "game-status";
        const mainBody = document.querySelector(".main-body");
        mainBody.insertBefore(statusDiv, mainBody.firstChild);
    }
    statusDiv.textContent = message;
}

function enableComputerBoardAttacks() {
    const computerBoard = document.querySelector(".player2Board");
    const squares = computerBoard.querySelectorAll(".square");
    
    squares.forEach(square => {
        square.addEventListener("click", () => {
            if (!gameStarted) return;
            
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            
            // Check if already attacked
            if (square.classList.contains("hit") || square.classList.contains("miss")) {
                showGameStatus("Already attacked that spot! Choose another.");
                return;
            }
            
            // Player attacks
            player1.attack(player2, [col, row]);
            
            // Check if hit or miss
            const isHit = player2.gameboard.board[row][col] !== null;
            square.classList.add(isHit ? "hit" : "miss");
            square.textContent = isHit ? "💥" : "•";
            
            // Check if game over
            if (player2.gameboard.allShipsSunk()) {
                showGameStatus("🎉 You win! All enemy ships destroyed!");
                gameStarted = false;
                return;
            }
            
            // Computer's turn
            setTimeout(() => {
                computerAttack();
            }, 500);
        });
    });
}

function computerAttack() {
    let attacked = false;
    
    while (!attacked) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        
        const playerBoard = document.querySelector(".player1Board");
        const square = playerBoard.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        
        // Check if already attacked
        if (!square.classList.contains("hit") && !square.classList.contains("miss")) {
            player2.attack(player1, [col, row]);
            
            const isHit = player1.gameboard.board[row][col] !== null;
            square.classList.add(isHit ? "hit" : "miss");
            square.textContent = isHit ? "💥" : "•";
            
            const hitOrMiss = isHit ? "hit" : "missed";
            showGameStatus(`Computer ${hitOrMiss} at [${col}, ${row}]. Your turn!`);
            
            // Check if game over
            if (player1.gameboard.allShipsSunk()) {
                showGameStatus("💀 Computer wins! All your ships destroyed!");
                gameStarted = false;
            }
            
            attacked = true;
        }
    }
}