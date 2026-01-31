import { test }  from "node:test";
import assert from "node:assert";
import { Ship } from "../src/classes.js";

test("Ship class creation", () => {
    const ship = new Ship(4);
    assert.strictEqual(ship.length, 4);
    assert.strictEqual(ship.hits, 0);
    assert.strictEqual(ship.isSunk(), false);
})

test("Ship hit method", () => {
    const ship = new Ship(4);
    ship.hit();
    assert.strictEqual(ship.hits, 1);
})

test("Ship isSunk method", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    assert.strictEqual(ship.isSunk(), true);
})