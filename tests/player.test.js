import { test }  from "node:test";
import assert from "node:assert";
import { Ship, GameBoard, Player } from "../src/classes.js";

test("PLayer creation with real player", () => {
    const player = new Player("real");
    assert.strictEqual(player.type, "real");
    assert.ok(player.gameBoard instanceof GameBoard);
})

test("Player creation with computer", () => {
    const computer = new Player("computer");
    assert.strictEqual(computer.type, "computer");
    assert.ok(computer.gameBoard instanceof GameBoard);
})

test("Different Players have their own GameBoard", () => {
    const player = new Player("real");
    const computer = new Player("computer");

    assert.notStrictEqual(player.gameBoard, computer.gameBoard);
})

test("Player can attack opponents GameBoard", () => {
    const player = new Player("real");
    const computer = new Player("computer");

    player.attack(computer, [0, 0]);
    assert.strictEqual(computer.gameBoard.missedAttacks.length, 1);
})

test("Computer can make random move", () => {
    const player = new Player("real");
    const computer = new Player("computer");

    computer.makeRandomMove(player);
    assert.strictEqual(player.gameBoard.missedAttacks.length, 1);
})