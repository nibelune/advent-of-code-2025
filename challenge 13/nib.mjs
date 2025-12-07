import fs from "node:fs";

// Lire le fichier et créer un tableau de lignes
const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const space = ".";
const splitter = "^";

// Trouver la position de S
const startRow = 0;
const startCol = lines[startRow].indexOf("S");

// Tableau de beams actifs, chaque élément est {row, col}
let activeBeams = [{ row: startRow + 1, col: startCol }];

let splits = 0;

while (activeBeams.length > 0) {
  const newBeams = [];
  const visited = new Set(); // pour éviter les duplications dans la même ligne

  for (const beam of activeBeams) {
    const { row, col } = beam;
    if (row >= lines.length) continue;

    const cell = lines[row][col];
    if (cell === space) {
      // Le beam continue
      const key = `${row + 1},${col}`;
      if (!visited.has(key)) {
        newBeams.push({ row: row + 1, col });
        visited.add(key);
      }
    } else if (cell === splitter) {
      // Le beam se split
      splits++;
      const leftKey = `${row + 1},${col - 1}`;
      const rightKey = `${row + 1},${col + 1}`;

      if (col > 0 && !visited.has(leftKey)) {
        newBeams.push({ row: row + 1, col: col - 1 });
        visited.add(leftKey);
      }
      if (col < lines[row].length - 1 && !visited.has(rightKey)) {
        newBeams.push({ row: row + 1, col: col + 1 });
        visited.add(rightKey);
      }
    }
  }

  activeBeams = newBeams;
}

console.log(splits);
