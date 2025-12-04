import fs from "fs";
const file = fs.readFileSync("input.txt", "utf8");
const input = file.split(","); // parse ranges of ids

// ----------------
// part2
// ----------------

// function that check if digit sequence has repeated pattern
function hasMulipleSequence(id) {
  const idStr = id.toString();
  const len = idStr.length;

  for (let cut = len; cut >= 2; cut --) {
    if (Number.isInteger(len / cut) ) {
      // console.log(len, cut, "valid split");
      // split every cut
      const digits = chunk(idStr, len / cut);
      // console.log(digits);
      if (allEqual(digits)) {
        return true;
      }
    }
  }

  // else
  return false;

}

// build chunks with a regex
function chunk(str, size) {
  const regex = new RegExp(`.{1,${size}}`, "g");
  return str.match(regex);
}

// test if all items in array are equals
function allEqual(arr) {
  return new Set(arr).size <= 1;
}

// test
// console.log(hasMulipleSequence(1010)); // -> true
// console.log(hasMulipleSequence(256256)); // -> true
// console.log(hasMulipleSequence(2282828)); // -> false


// final : detection with regex (much much faster !)
function isRepeatedPattern(str) {
  return /^(.+)\1+$/.test(str);
}

// test
// console.log(isRepeatedPattern(1010)); // -> true
// console.log(isRepeatedPattern(256256)); // -> true
// console.log(isRepeatedPattern(2282828)); // -> false

function countInvalidIds(data) {
  // loop on ranges
  const invalidIds = [];
  for (const range of data) {
    // extract limits
    const [start, end] = range.split("-").map(limit => Number(limit));

    // loop from start to end of range
    for (let id = start; id <= end; id ++) {
      if (isRepeatedPattern(id)) {
        invalidIds.push(id);
      }
    }
  }

  // sum invalid ids
  return invalidIds.reduce((a, b) => a + b, 0);
}

console.log("Part 2 - Total invalid IDs for input :", countInvalidIds(input)); // -> 36862281418