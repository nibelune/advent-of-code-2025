import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split("\n");

// ----------------
// part 1
// ----------------

// function that finds the largest joltage composed of two batteries from a bank
function findLargestJoltageIn(bank) {
  // bank to array of values
  const batteries = bank.split("").map(b => +b);

  // find the highest but not the latest
  const one = Math.max(...batteries.slice(0, -1));

  // remove all batteries before the highest
  const indexOfOne = batteries.indexOf(one);
  batteries.splice(0, indexOfOne + 1);

  // find the second highest from the rest
  const two = Math.max(...batteries);

  // console.log(one, two);
  return +`${one}${two}`;
}

// engine
function calculateTotalOutputJoltage(data) {
  let totalOutputJoltage = 0;

  for (const bank of data) {
    totalOutputJoltage += findLargestJoltageIn(bank);
  }

  return totalOutputJoltage;
}

// results
// console.log("Part 1 - Total output joltage :", calculateTotalOutputJoltage(data)); // -> 357
console.log("Part 1 - Total output joltage :", calculateTotalOutputJoltage(input)); // -> 17403