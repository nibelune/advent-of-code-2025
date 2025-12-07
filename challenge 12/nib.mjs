import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const data = input.split("\n");
data.pop();

const operatorLine = data[4];

const columnsSizes = [];
let columnSize = 0;
for (let index = 0; index < operatorLine.length; index++) {
  if (index > 0) {
    if (operatorLine[index] !== " ") {
      columnsSizes.push(columnSize);
      columnSize = 0;
    }
    columnSize++;
  }
}
columnsSizes.push(columnSize + 1);

const operators = data[4].split(/\s+/);
operators.pop();
for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
  const lineArray = [];
  const fullLine = data[lineIndex];
  let currentPos = 0;
  for (const size of columnsSizes) {
    lineArray.push(fullLine.substring(currentPos, currentPos + size));
    currentPos += size;
  }
  data[lineIndex] = lineArray;
}

for (
  let operationIndex = 0;
  operationIndex < operators.length;
  operationIndex++
) {
  const stringValues = [];
  for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
    stringValues.push(data[lineIndex][operationIndex]);
  }
}

const numbersValues = [];
for (
  let operationIndex = 0;
  operationIndex < operators.length;
  operationIndex++
) {
  let operands = [];
  for (
    let charIndex = columnsSizes[operationIndex] - 1;
    charIndex > -1;
    charIndex--
  ) {
    let num = "";
    for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
      num += data[lineIndex][operationIndex][charIndex];
    }
    operands.push(+num);
  }
  numbersValues.push(operands);
}

const operands = numbersValues.map((array) => array.filter((v) => v !== 0));

const results = [];
for (let index = 0; index < operators.length; index++) {
  if (operands[index].length > 0) {
    results.push(
      operands[index].reduce((result, value) => {
        return operators[index] === "+" ? result + value : result * value;
      }),
    );
  }
}

console.log(results.reduce((sum, val) => sum + val, 0));
