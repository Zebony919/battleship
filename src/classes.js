export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    get isSunk() {
        if (this.hits >= this.length) {
            return true;
        }
        return false;
    }
}

export class GameBoard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    }

    placeShip(ship, [x, y], orientation) {
        const positions = [];

        for (let i = 0; i < ship.length; i++) {
            const posX = orientation === "horizontal" ? x + i : x;
            const posY = orientation === "vertical" ? y + i : y;

            positions.push([posX, posY]);
            this.board[posY][posX] = ship;
        }

        this.ships.push({ ship, positions });
    }

    receiveAttack([x, y]) {
        const target = this.board[y][x];

        if (target) {
            target.hit();
        } else {
            this.missedAttacks.push([x, y]);
        }
    }

    allShipsSunk() {
        return this.ships.every(({ ship }) => ship.isSunk);
    }
}

export class Player {
    constructor(type) {
        this.type = type;
        this.gameBoard = new GameBoard();
    }

    attack(player, coordinates) {
        player.gameBoard.receiveAttack(coordinates);
    }

    makeRandomMove(opponent) {
        if (this.type === 'computer') {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            this.attack(opponent, [x, y]);
        }
    }
}