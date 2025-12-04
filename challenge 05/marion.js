
import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input.txt');


(async () => {
  const file = await open(filePath);

  let sumJoltage = 0;
  for await (const line of file.readLines()) {

    let toSort = line.slice(0, line.length-1).split('').sort((a,b) => Number(b) - Number(a));

    let joltage = toSort[0];

    joltage += line.slice(line.indexOf(toSort[0])+1).split('').sort((a,b) => Number(b) - Number(a))[0];

    sumJoltage += Number(joltage);
  }

  console.log(sumJoltage);
})();


