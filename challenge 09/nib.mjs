import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

let [part1, part2] = input.split("\n\n");
const ranges = part1
  .split("\n")
  .map((range) => ({ min: range.split("-")[0], max: range.split("-")[1] }));
const ids = part2.split("\n");
ids.pop();

let freshCounter = 0;
idLoop: for (const id of ids) {
  for (const range of ranges) {
    if (+id >= +range.min && +id <= +range.max) {
      freshCounter++;
      continue idLoop;
    }
  }
}

console.log(freshCounter);
