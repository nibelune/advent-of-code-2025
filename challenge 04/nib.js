import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");
const ranges = input.split(",");

let sum = 0;

for (const range of ranges) {
  let [start, end] = range.split("-");
  for (let id = +start; id <= +end; id++) {
    sum += /^(\d+)\1+$/.test(id.toString()) ? id : 0;
  }
}

console.log(sum);
