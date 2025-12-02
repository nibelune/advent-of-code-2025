import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8");
const moves = input.split("\n");

let position = 50;

const countZero = moves.reduce((total, move) => {
  const direction = move[0];
  const value = parseInt(move.slice(1)) % 100;
  if (direction === "R") {
    position = (position + value) % 100;
  } else if (direction === "L") {
    position = (position - value + 100) % 100;
  }
  return position === 0 ? total + 1 : total;
}, 0);

console.log(`La roue s'arrête ${countZero} fois sur 0.`);
