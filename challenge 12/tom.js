import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

function parseInput(input) {
  // make multidimensional array
  // rows ares separated by new lines \n
  // then split on each character
  const lines = input
    .split("\n")
    .map((line) => line.split(""));

  // to know how many columns to group together, find the number of spaces after operators (last row)
  // and add one to each (to include the operator column)
  const lastRow = lines[lines.length - 1];
  const spaceCounts = []; // [3,3,4] means first problem occupies 3 columns, second 3 columns, third 4 columns

  let spaceCount = 0;
  for (let i = 0; i < lastRow.length; i++) {
    const char = lastRow[i];
    if (char === " ") {
      spaceCount++;
    } else {
      if (spaceCount > 0) {
        spaceCounts.push(spaceCount);
        spaceCount = 0;
      }
    }
  }
  if (spaceCount > 0) {
    spaceCounts.push(spaceCount + 1);
  }

  // group columns based on space counts, keeping spaces, delete empty columns
  const problems = [];

  let colIndex = 0;
  for (let countIndex = 0; countIndex < spaceCounts.length; countIndex++) {
    const groupSize = spaceCounts[countIndex];
    const groupedProblem = lines.map((line) => {
      return line.slice(colIndex, colIndex + groupSize);
    });
    problems.push(groupedProblem);
    colIndex += groupSize + 1; // +1 to skip the space column
  }

  // transpose each problem
  const transposedProblems = problems.map((problem) => {
    // transpose only the operands (all but last line)
    const operator = problem.pop();
    const operandLines = rotateMatrix(problem);

    // re-add the operator line
    operandLines.push(operator);
    return operandLines;
  });

  // convert each problem to single array of operands and operator
  const finalProblems = transposedProblems.map((problem) => {
    const operands = problem.map((line) => line.join("").trim());
    const convertedProblem = operands.map((value, index) => {
      if (index === operands.length - 1) {
        return value; // operator
      }
      return Number(value); // operands
    });
    return convertedProblem;
  });

  return finalProblems;
}


// transpose horizontal to vertical
  /* eg : 
    [ '1', '2', '3' ],
    [ ' ', '4', '5' ],
    [ ' ', ' ', '6' ],

    becomes
    [ '356' ],
    [ '24' ],
    [ '1' ],
  */
// function to rotate a matrix to 90° anti clockwise (transpose)
function rotateMatrix(matrix) {
  const rotated = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let col = cols - 1; col >= 0; col--) {
    const newRow = [];
    for (let row = 0; row < rows; row++) {
      newRow.push(matrix[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated;
}

// function to solve a problem (list of operands and an operator at the end e.g. [1,2,3,'+'])
function solve(problem) {
  const operands = problem.slice(0, -1);
  const operator = problem[problem.length - 1];
  
  const operators = {
    '+': (values) => values.reduce((acc, val) => acc + val, 0),
    '-': (values) => values.reduce((acc, val) => acc - val),
    '*': (values) => values.reduce((acc, val) => acc * val, 1),
    '/': (values) => values.reduce((acc, val) => acc / val),
  };
  
  return operators[operator](operands);
}


// solve all problems and sum all results
function solveAll(input) {

  // parsed data
  const data = parseInput(input);

  let total = 0;
  for (const problem of data) {
    const result = solve(problem);
    total += result;
  }
  
  return total;
}

console.log("part 2 - grand total : ", solveAll(input));