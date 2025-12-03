// mon humble tentative à améliorer :D

const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./day1-input.txt');
  let start = {end : 50, passThroughZero: 0};
  let numberOfZero = 0;

  for await (const line of file.readLines()) {
    const result1 = cut(line);
    start = analyse(start.end, result1);
    if (start.end === 0) {
        numberOfZero++;
    }
    numberOfZero += start.passThroughZero;
  }

})();

function cut(input) {
    const result = [];
    result.push(input.charAt(0));
    result.push(Number(input.slice(1)));
    return result;
}

function analyse(start, data) {

    let passThroughZero = data[1] / 100;
    let rotations = data[1] % 100;
    let end;
    if (data[0] === "R") {
        end = start + rotations;
    }
    else {
        end = start - rotations;
    }

    if (end < 0) {
        end = 100 + end;
        if (end != 0 && start != 0) passThroughZero++;
    }
    else if (end > 99) {
        end = end - 100;
        if (end != 0 && start != 0) passThroughZero++;
    }

    return {end, passThroughZero: Math.floor(passThroughZero)};
}
