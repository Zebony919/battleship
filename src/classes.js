export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.hits >= this.length) {
            return true;
        }
        return false;
    }
}

export class gameBoard {
    
}

export class Player {
    
}