import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const data = input.split("\n").slice(0, -1);

const operatorLine = data[4];
const operators = operatorLine.split(/\s+/).slice(0, -1);

const colSizes = [];

let colSize = 0;
for (let index = 0; index < operatorLine.length; index++) {
  if (index > 0) {
    if (operatorLine[index] !== " ") {
      colSizes.push(colSize);
      colSize = 0;
    }
    colSize++;
  }
}
colSizes.push(colSize + 1);

for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
  const lineArray = [];
  const fullLine = data[lineIndex];
  let currentPos = 0;
  for (const size of colSizes) {
    lineArray.push(fullLine.substring(currentPos, currentPos + size));
    currentPos += size;
  }
  data[lineIndex] = lineArray;
}

const verticalNumbers = [];
for (let index = 0; index < operators.length; index++) {
  let operands = [];
  for (let charIndex = colSizes[index] - 1; charIndex > -1; charIndex--) {
    let num = "";
    for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
      num += data[lineIndex][index][charIndex];
    }
    operands.push(+num);
  }
  verticalNumbers.push(operands);
}

const operands = verticalNumbers.map((array) => array.filter((v) => v !== 0));

const result = operands
  .filter((operand) => operand.length > 0)
  .map((operand, index) => {
    return operand.reduce((result, value) => {
      return operators[index] === "+" ? result + value : result * value;
    });
  })
  .reduce((sum, val) => sum + val, 0);

console.log(result);
