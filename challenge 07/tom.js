import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

// coordinates of adjacent cells
const adjacentsCells = [
  [-1, -1], [-1, 0], [-1, 1],
  [0,  -1],          [0,  1],
  [1,  -1], [1,  0], [1,  1],
];

// ----------------
// part 1
// ----------------

// function to count accessible rolls of paper
function countAccessibleRollsOfPaper(data) {

  // parse data in a multidimensionnal array
  const grid = data.trim().split("\n").map(line => line.trim().split(""));

  let accessibleRollOfPaper = 0;

  // for each row
  for (let row = 0; row < grid.length; row++) {

    // for each col
    for (let col = 0; col < grid[row].length; col++) {

      // if cell is roll of paper @
      if (grid[row][col] === "@") {
        let adjacentRollsOfPaper = 0;

        // check adjacent cells
        for (const [adjacentsCellRow, adjacentsCellCol] of adjacentsCells) {
          const rowToCheck = row + adjacentsCellRow;
          const colToCheck = col + adjacentsCellCol;

          // if adjacent cell is valid and is a roll of paper
          if (
            rowToCheck >= 0 && rowToCheck < grid.length &&
            colToCheck >= 0 && colToCheck < grid[row].length &&
            grid[rowToCheck][colToCheck] === "@"
          ) {
            adjacentRollsOfPaper++;
          }

          // if there are already 4 adjacent rolls of paper, break loop
          if (adjacentRollsOfPaper >= 4) {
            break;
          }

        }
        // if less than 4 adjacent rolls of paper : its a good one !
        if (adjacentRollsOfPaper < 4) {
          // increment accessibleRollOfPaper
          accessibleRollOfPaper++;
        }
      }
    }
  }

  return accessibleRollOfPaper;
}

// console.log("Part 1 - Total accessible rolls of paper (test) : ", countAccessibleRollsOfPaper(data)); // -> 13
console.log("Part 1 - Total accessible rolls of paper : ", countAccessibleRollsOfPaper(input)); // -> 1424