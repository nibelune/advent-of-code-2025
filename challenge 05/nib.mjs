import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const batteries = input.split("\n");
batteries.pop();
let counter = 0;

function maxTwoDigitNumber(line) {
  let max = -1;
  let bestSuffixDigit = -1;

  for (let i = line.length - 1; i >= 0; i--) {
    const digit = Number(line[i]);

    if (bestSuffixDigit !== -1) {
      const num = digit * 10 + bestSuffixDigit;
      if (num > max) max = num;
    }

    if (digit > bestSuffixDigit) bestSuffixDigit = digit;
  }

  return max;
}

for (const battery of batteries) {
  const largestNumber = maxTwoDigitNumber(battery);
  console.log(largestNumber);
  counter += largestNumber;
}

console.log(counter);
