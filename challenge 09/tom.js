import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

// function to make arrays of fresh ids
function collectFreshIngredientsIds(data) {
  // extract ranges block
  const rangesPart = data.split("\n\n")[0];

  // extracts limits ids from each ranges
  const ranges = rangesPart.split("\n")
                .map(range => range.split("-")
                .map(limit => +limit));
  
  // console.log(ranges); // -> [[3,5], [10,14], ...]
  return ranges;
}

// function to find availables ingredients in list
function findFreshIngredients(data) {

  // retrieve list
  const ranges = collectFreshIngredientsIds(data);

  // make an array of available ids
  const availableIds = data.split("\n\n")[1].split("\n").map(id => +id);
  // console.log(availableIds);

  // compare and find ingredients to keep
  const freshIngredients = new Set([]);
  for (const id of availableIds) {
    for (const range of ranges) {
      if (id >= range[0] && id <= range[1]) {
        freshIngredients.add(id);
      }
    }
  }

  // console.log(freshIngredients);
  // return the length of freshIngredients
  return Array.from(freshIngredients).length;
}

console.log("Part 1 - Number of fresh ingredients : ", findFreshIngredients(input)); // -> 896