import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const data = input.split("\n").map(line => line.split(""));

let splitCounter = 0;

// downward movement, from second line
for (let lineIndex = 1; lineIndex < data.length; lineIndex++) {

  const previousLine = data[lineIndex - 1];
  const currentLine = data[lineIndex];

  // for each character in the line
  for (let charIndex = 0; charIndex < currentLine.length; charIndex++) {

    const previousChar = previousLine[charIndex];
    const currentChar = currentLine[charIndex];

    // if the character above is a "S" and the current character is a "."
    if (previousChar === "S" && currentChar === ".") {
      // change the current character to a "|" (the beam)
      currentLine[charIndex] = "|";
    }

    // if the character above is a "|" and the current character is a "."
    if (previousChar === "|" && currentChar === ".") {
      // change the current character to a "|"
      currentLine[charIndex] = "|";
    }

    // if the current character is a "^" and the caracter above is a "|" : divide the beam !
    if (currentChar === "^" && previousChar === "|") {
      // add "|" arround (left and right) the current character
      // but not on edges of diagram
      if (charIndex > 0) {
        currentLine[charIndex - 1] = "|";
      }
      if (charIndex < currentLine.length - 1) {
        currentLine[charIndex + 1] = "|";
      }
      splitCounter++;
    }
  }
}

// console.table(data);
console.log("Part 1 - beam split count : ", splitCounter); // -> 1698
