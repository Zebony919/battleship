import { test }  from "node:test";
import assert from "node:assert";
import { Ship, GameBoard } from "../src/classes.js";

test("GameBoard creation", () => {
    const board = new GameBoard();
    assert.ok(board)
})

test("GameBoard placeShip method", () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");
    assert.ok(true);
})

test("GameBoard receiveAttack method hits a ship", () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");

    board.receiveAttack([0, 0]);
    assert.strictEqual(ship.hits, 1);
})

test("GameBoard receiveAttack method misses", () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");

    board.receiveAttack([5, 5]);
    assert.strictEqual(board.missedAttacks.length, 1);
    assert.deepStrictEqual(board.missedAttacks[0], [5, 5]);
})

test("GameBoard tracks multiple missed hits", () => {
    const board = new GameBoard();
    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);

    assert.strictEqual(board.missedAttacks.length, 2);
})

test("GameBoard can report all Ships sunk", () => {
    const board = new GameBoard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(1);

    board.placeShip(ship1, [0, 0], "horizontal");
    board.placeShip(ship2, [3, 3], "horizontal");

    console.log('Ship1 positions:', board.ships[0].positions);
    console.log('Ship2 positions:', board.ships[1].positions);

    board.receiveAttack([0, 0]);
    console.log('Ship1 hits after [0,0]:', ship1.hits);
    
    board.receiveAttack([1, 0]);
    console.log('Ship1 hits after [1,0]:', ship1.hits, 'isSunk:', ship1.isSunk);
    
    board.receiveAttack([3, 3]);
    console.log('Ship2 hits after [3,3]:', ship2.hits, 'isSunk:', ship2.isSunk);

    assert.strictEqual(board.allShipsSunk(), true);
})

test("Gameboard reports not all ships sunk", () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], 'horizontal');
    
    board.receiveAttack([0, 0]);
    assert.strictEqual(board.allShipsSunk(), false);
});
