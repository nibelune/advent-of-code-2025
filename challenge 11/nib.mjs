import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const data = input.split("\n").map((line) => line.split(/\s+/));
data.pop();
data[4].pop();

let total = 0;

for (let index = 0; index < data[0].length; index++) {
  const operator = data[4][index];
  let values = [];
  for (let line = 0; line < 4; line++) {
    values.push(+data[line][index]);
  }
  const result = values.reduce((acc, n) => {
    switch (operator) {
      case "+":
        return acc + n;
      case "*":
        return acc * n;
      default:
        throw new Error("Opérateur inconnu : " + op);
    }
  });
  total += result;
}

console.log(total);
