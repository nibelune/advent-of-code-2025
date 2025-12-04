import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split("\n");

// ----------------
// part 1
// ----------------

// global variables
let dialCurrent = 50;
let zeroSeen = 0;

// function to count when dial stops at zero and set the cuurent value
function countZeroAndSetNextValue1(direction, ticks) {

  const increment = {
    "R": +1,
    "L": -1,
  };
  
  // turn the dial
  for (let turn = 0; turn < ticks; turn++) {
    
    dialCurrent += increment[direction];
    
    // limits
    if (dialCurrent > 99) {
      dialCurrent = 0;
    }
  
    if (dialCurrent < 0) {
      dialCurrent = 99;
    }
  }
  
  // zero spotted after the turns
  if (dialCurrent === 0) {
    zeroSeen ++;
  }

}

// loop on data
for (const line of input) {
  const direction = line.charAt(0);
  const ticks = parseInt(line.slice(1), 10);
  countZeroAndSetNextValue1(direction, ticks);
} 

console.log("Part 1 - Total zero spotted for input :", zeroSeen); // -> 1029