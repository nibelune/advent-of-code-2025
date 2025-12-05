import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const ranges = input
  .split("\n\n")[0]
  .split("\n")
  .map((range) => ({ min: +range.split("-")[0], max: +range.split("-")[1] }));

function countUniqueIntegers(ranges) {
  if (ranges.length === 0) return 0;
  const sortedRanges = [...ranges].sort((a, b) => a.min - b.min);
  const mergedRanges = [sortedRanges[0]];
  for (let i = 1; i < sortedRanges.length; i++) {
    const current = sortedRanges[i];
    const last = mergedRanges[mergedRanges.length - 1];
    if (current.min <= last.max + 1) {
      last.max = Math.max(last.max, current.max);
    } else {
      mergedRanges.push(current);
    }
  }
  let total = 0;
  for (const range of mergedRanges) {
    total += range.max - range.min + 1;
  }
  return total;
}

console.log(countUniqueIntegers(ranges));
