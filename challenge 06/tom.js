import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split("\n");

// ----------------
// part 2
// ----------------

// function that keeps the highest number composed of n batteries from an bank
function findLargestJoltageIn(bank, batteriesToKeep) {
  // bank to array of values
  const batteries = bank.split("").map(b => +b);
  const numberOfBatteriesToRemove = batteries.length - batteriesToKeep;

  // remove all batteries with low values to keep only n highest
  for (let i = 0; i < numberOfBatteriesToRemove; i++) {
    // find the lowest battery that can be removed
    let batteryToRemove = -1;

    // find the first battery that is lower than the next one
    for (let j = 0; j < batteries.length - 1; j++) {
      if (batteries[j] < batteries[j + 1]) {
        batteryToRemove = j;
        break;
      }
    }

    // if no battery found, remove the last one
    if (batteryToRemove === -1) {
      batteryToRemove = batteries.length - 1;
    }
    batteries.splice(batteryToRemove, 1);
  }
  
  // console.log(batteries.join(''));
  return +batteries.join("");
}

// loop
function calculateTotalOutputJoltage(data) {
  let totalOutputJoltage = 0;

  for (const bank of data) {
    totalOutputJoltage += findLargestJoltageIn(bank, 12);
  }

  return totalOutputJoltage;
}

// results
// console.log("Part 1 - Total output joltage :", calculateTotalOutputJoltage(data)); // -> 3121910778619
console.log("Part 1 - Total output joltage :", calculateTotalOutputJoltage(input)); // -> 173416889848394