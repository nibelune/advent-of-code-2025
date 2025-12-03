import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const batteries = input.split("\n");
batteries.pop();
let counter = 0;

function maxNumberOfLength(line, numberLength = 12) {
  const n = line.length;
  if (n < numberLength) return null;

  const stack = [];
  let toRemove = n - numberLength;

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

for (const battery of batteries) {
  const largestNumber = maxNumberOfLength(battery);
  console.log(largestNumber);
  counter += parseInt(largestNumber, 10);
}

console.log(counter);
