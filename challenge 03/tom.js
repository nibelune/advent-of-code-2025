import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split(","); // parse ranges of ids

// ----------------
// part 1
// ----------------

// function that check if digit sequence is repeated twice
function hasDoubleSequence(id) {
  const idStr = id.toString();
  const len = idStr.length;

  // is odd = not possible
  if (len % 2 !== 0) {
    // console.log("odd");
    return false;
  }

  // cut in half
  const part1 = idStr.slice(0, len * .5);
  const part2 = idStr.slice(- len * .5);

  // compare parts
  return part1 === part2;
}

// test
// console.log(hasDoubleSequence(1010)); // -> true
// console.log(hasDoubleSequence(999)); // -> false

// loop
function treatment(data) {
  const invalidIds = [];

  for (const range of data) {
    // extract limits
    const [start, end] = range.split("-").map(limit => Number(limit));

    // loop from start to end of range
    for (let id = start; id <= end; id ++) {
      // part1
      if (hasDoubleSequence(id)) {
        invalidIds.push(id);
      }
    }
  }
  return invalidIds.reduce((a, b) => a + b, 0);
}

// results
console.log("Part 1 - Sum of invalid IDs :", treatment(input)); // -> 19605500130