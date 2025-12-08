import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

// function to make arrays of fresh ids and order them
function collectFreshIngredientsIds(data) {
  // extract ranges block
  const rangesPart = data.split("\n\n")[0];

  // extracts limits ids from each ranges and sort them
  const ranges = rangesPart.split("\n")
                .map(range => range.split("-")
                .map(limit => +limit))
                .sort((a, b) => a[0] - b[0]);
  
  // console.log(ranges); // -> [[3,5], [10,14], ...]
  return ranges;
}

// function to count numbers in range, but excluding overlaps
function findFreshIngredients(data) {

  // list of ordered ranges
  const ranges = collectFreshIngredientsIds(data);

  let freshIngredientsCount = 0;
  let currentMax = -1;

  // for each range, check if it overlaps with the previous max
  for (const range of ranges) {
    const start = Math.max(range[0], currentMax + 1);
    const end = range[1];

    if (start <= end) {
      freshIngredientsCount += (end - start + 1);
      currentMax = end;
    }
  }

  return freshIngredientsCount;
}

console.log("Part 1 - Number of fresh ingredients : ", findFreshIngredients(input)); // -> 346240317247002