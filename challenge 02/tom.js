import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split("\n");

// ----------------
// part 2
// ----------------

// global variables
let dialCurrent = 50;
let zeroSeen = 0;

// function to count when dial going through a zero and set the current value
function countZeroAndSetNextValue2(direction, ticks) {

  const increment = {
    "R": +1,
    "L": -1,
  };
   
  // turn the dial
  for (let turn = 0; turn < ticks; turn++) {
    
    dialCurrent += increment[direction];
    
    if (dialCurrent > 99) {
      dialCurrent = 0;
    }
  
    if (dialCurrent < 0) {
      dialCurrent = 99;
    }
    
    // zero spotted, but within the turns
    if (dialCurrent === 0) {
      zeroSeen ++;
    }
  }
}

// loop on data
for (const line of input) {
  const direction = line.charAt(0);
  const ticks = parseInt(line.slice(1), 10);
  countZeroAndSetNextValue2(direction, ticks);
} 

console.log("Part 2 - Total zero spotted for input :", zeroSeen); // -> 5892