import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const data = input.trim().split("\n").map(line => line.split(""));
const rows = data.length;
const cols = data[0].length;

// find starting point
let startY = 0;
let startX = data[0].indexOf("S");

// build a grid to save path points
const pathGrid = Array.from({ length: rows }, () => Array(cols).fill(null));
// console.table(pathGrid);

// recursive function to count paths
function analysePathFrom(y, x) {

    // Outside of the grid, stop
    if (x < 0 || x >= cols) return 0;

    // last row, found a timeline, stop and count 1
    if (y === rows - 1) return 1;

    // path already calculated, return saved value
    if (pathGrid[y][x]) return pathGrid[y][x];

    // current cell
    const cell = data[y][x];

    // total paths from this point
    let total = 0;

    // if its a splitter
    if (cell === "^") {
        // restart analysis on both sides
        total += analysePathFrom(y + 1, x - 1);
        total += analysePathFrom(y + 1, x + 1);
    } else {
        // restart analysis downward
        total += analysePathFrom(y + 1, x);
    }

    // save path in grid
    pathGrid[y][x] = total;

    //console.table(pathGrid);
    return total;
}

const timeLines = analysePathFrom(startY, startX);
console.log("Part 2 - number of Timelines :", timeLines);