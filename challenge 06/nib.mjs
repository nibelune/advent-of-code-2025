import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const batteries = input.split("\n");
batteries.pop();

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;

function maxNumberOfLength(line, numberLength = 12) {
  const lineLength = line.length;
  if (lineLength < numberLength) return null;

  const stack = [];
  let toRemove = lineLength - numberLength;

  for (const digit of line) {
    while (
      toRemove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < digit
    ) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }
  return stack.slice(0, numberLength).join("");
}

function maxNumberOfLengthTom(line, numberLength = 12) {
  const lineLength = line.length;
  if (lineLength < numberLength) return null;

  let totalDeletions = lineLength - numberLength;

  deletionLoop: for (let deletion = 0; deletion < totalDeletions; deletion++) {
    for (let index = 0; index < lineLength; index++) {
      if (parseInt(line[index], 10) < parseInt(line[index + 1], 10)) {
        line = line.slice(0, index) + line.slice(index + 1);
        continue deletionLoop;
      }
    }
    line = line.slice(0, -1);
  }
  return parseInt(line, 10);
}

function maxNumberOfLengthRecursive(line, numberLength = 12) {
  if (numberLength === 0) return "";
  if (line.length === numberLength) return line;

  const maxDigit = Math.max(
    ...line
      .slice(0, line.length - numberLength + 1)
      .split("")
      .map(Number),
  );
  const maxDigitPosition = line.indexOf(maxDigit.toString());

  return (
    maxDigit +
    maxNumberOfLengthRecursive(
      line.slice(maxDigitPosition + 1),
      numberLength - 1,
    )
  );
}

console.timeEnd("Nib solution");
for (const battery of batteries) {
  const largestNumber = maxNumberOfLength(battery);
  counter1 += parseInt(largestNumber, 10);
}
console.log(counter1);
console.timeEnd("Nib solution");

console.time("Tom solution");
for (const battery of batteries) {
  const largestNumber = maxNumberOfLengthTom(battery);
  counter2 += parseInt(largestNumber, 10);
}
console.log(counter2);
console.timeEnd("Tom solution");

console.time("recursive solution");
for (const battery of batteries) {
  const largestNumber = maxNumberOfLengthRecursive(battery);
  counter3 += parseInt(largestNumber, 10);
}
console.log(counter3);
console.timeEnd("recursive solution");
