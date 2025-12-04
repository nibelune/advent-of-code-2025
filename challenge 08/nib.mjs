import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const removed = "x";
const roll = "@";
const size = input.split("\n").length - 1;

const rolls = input
  .split("\n")
  .slice(0, -1)
  .map((line) => line.split(""))
  .flat();

let workRolls = [...rolls];

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

let computing = true;

while (computing) {
  const prevRolls = [...workRolls];
  workRolls = workRolls.map((value, index) => {
    // si la case contient un rouleau
    if (value === roll) {
      const col = index % size;
      const row = Math.floor(index / size);
      let rollCounter = 0;
      // on regarde sur les cases adjacentes combien de rouleaux
      for (const position of surroundingPositions) {
        const [dRow, dCol] = position;
        if (getCase(workRolls, size, col + dCol, row + dRow) === roll) {
          rollCounter++;
        }
      }
      // si moins de 4 rouleaux, on enlève le rouleau
      if (rollCounter < 4) {
        return removed;
      }
      // sinon on renvoie le rouleau
      return value;
    }
    // sinon on renvoie la case initiale
    return value;
  });

  // si le tableau n'est plus modifié, on arrête
  if (workRolls.every((val, i) => val === prevRolls[i])) {
    computing = false;
  }
}

// sauvegarder le fichier output.txt contenant workRolls avec 138 caractères par ligne
const output = workRolls.join("");
fs.writeFileSync("output.txt", output.match(/.{1,138}/g).join("\n"));

// on compte le nombre de rouleau supprimés
console.log(
  workRolls.reduce((total, val) => {
    return val === removed ? total + 1 : total;
  }, 0),
);

function getCase(cases, size, col, row) {
  if (caseExists(col, row, size)) {
    return cases[col + row * size];
  }
  return null;
}

function caseExists(col, row, size) {
  return col >= 0 && row >= 0 && col < size && row < size;
}
