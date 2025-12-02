import { readFileSync } from "fs";

const puzzleInput = readFileSync("input.txt", "utf8");
const wheelMoves = puzzleInput.trim().split("\n");
const WHEEL_SIZE = 100;
const WHEEL_START = 50;
let zeroCounter = 0;

const wheel = {
  position: WHEEL_START,
  size: WHEEL_SIZE,
  move(direction, value) {
    let zeroCount = 0;
    for (let index = 0; index < value; index++) {
      this.position += direction === "R" ? 1 : -1;
      this.position = (this.position + this.size) % this.size;
      zeroCount += this.position === 0 ? 1 : 0;
    }
    return zeroCount;
  },
};

for (const wheelMove of wheelMoves) {
  const direction = wheelMove[0];
  const value = parseInt(wheelMove.slice(1));
  zeroCounter += wheel.move(direction, value);
}

console.log(`La roue est passée ${zeroCounter} fois par la case zéro`);
