import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

function parseInput(input) {
  // make multidimensional array
  // rows ares separated by new lines \n
  // columns are separated by empty space (regex : one or more spaces)
  const problems = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/\s+/));

  // convert data to numbers, except the last row
  const data = problems.map((row, rowIndex) => {
    if (rowIndex === problems.length - 1) {
      return row;
    }
    return row.map((value) => Number(value));
  });

  return data;
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

// solve all problems and add all results
function solveAll(input) {

  // parse data
  const data = parseInput(input);

  // build problems arrays (1st problem is a row containing data[0][0], data[1][0], data[n][0]...)
  const nbOfLines = data.length - 1; // last line is not a number line
  const nbOfProblems = data[0].length;

  let total = 0;

  for (let i = 0; i < nbOfProblems; i++) {
    // extract one single problem
    const problem = [];
    for (let j = 0; j < nbOfLines; j++) {
      problem.push(data[j][i]);
    }
    // add operator at the end
    problem.push(data[nbOfLines][i]);

    // solve the problem
    const result = solve(problem);

    // add to total
    total += result;
  }
  
  return total;
}

console.log("part 1 - grand total : ", solveAll(input)); // -> 4722948564882