import fs from "node:fs";

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const space = ".";
const splitter = "^";

const startRow = lines.findIndex((line) => line.includes("S"));
const startCol = lines[startRow].indexOf("S");

let current = new Map();
current.set(`${startRow + 1},${startCol}`, 1);

for (let row = startRow + 1; row < lines.length; row++) {
  const next = new Map();

  for (const [key, count] of current.entries()) {
    const [r, c] = key.split(",").map(Number);
    const cell = lines[row][c];

    if (cell === space) {
      const nextKey = `${row + 1},${c}`;
      next.set(nextKey, (next.get(nextKey) || 0) + count);
    } else if (cell === splitter) {
      if (c > 0) {
        const leftKey = `${row + 1},${c - 1}`;
        next.set(leftKey, (next.get(leftKey) || 0) + count);
      }
      if (c < lines[row].length - 1) {
        const rightKey = `${row + 1},${c + 1}`;
        next.set(rightKey, (next.get(rightKey) || 0) + count);
      }
    }
  }

  current = next;
}

let totalTimelines = 0;
for (const val of current.values()) {
  totalTimelines += val;
}

console.log(totalTimelines);
