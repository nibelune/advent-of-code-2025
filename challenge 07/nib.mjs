import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const empty = ".";
const roll = "@";
const size = input.split("\n").length - 1;

const rolls = input
  .split("\n")
  .slice(0, -1)
  .map((line) => line.split(""))
  .flat();

const surroundingPositions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const counter = rolls.reduce((total, value, index) => {
  if (value === roll) {
    const col = index % size;
    const row = Math.floor(index / size);
    let rollCounter = 0;
    for (const position of surroundingPositions) {
      const [dRow, dCol] = position;
      if (getCase(rolls, size, col + dCol, row + dRow) === roll) {
        rollCounter++;
      }
    }
    return rollCounter < 4 ? total + 1 : total;
  }
  return total;
}, 0);

function getCase(cases, size, col, row) {
  if (parcelExists(col, row, size)) {
    return cases[col + row * size];
  }
  return null;
}

function parcelExists(col, row, size) {
  return col >= 0 && row >= 0 && col < size && row < size;
}

console.log(counter);
