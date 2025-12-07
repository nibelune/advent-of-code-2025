import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input.txt');

(async () => {
  const file = await open(filePath);

  const shelves = [];
  let result = 0;
  for await (const line of file.readLines()) {
    shelves.push(line.split(''));
  }

  shelves.forEach((line, indexLine) => {
    console.log(`---Etagère numéro ${indexLine} :`)
    line.forEach((item, indexItem) => {
        console.log(`-Casier numéro ${indexItem} :`)
        if (isRoll(item)) {
            const numberOfRools = getNumberOfRools (shelves, indexLine, indexItem);
            if (numberOfRools < 4) {
                result++;
            }
        }
    })
  })
  console.log('--- Résultat', result);
})();

function getNumberOfRools (shelves, indexLine, indexItem) {
    let numberOfRools = 0;
    debugger;

    for (let i = indexLine-1 ; i <= indexLine+1; i++) {
        if (i >= 0 && i < shelves.length) {
            for (let j = indexItem-1; j <= indexItem+1; j++) {
                if (j >= 0) {
                    if (i != indexLine || j!= indexItem) {
                        if (isRoll(shelves[i][j])) {
                            numberOfRools++;
                        }
                    }
                }
            }
        }
    }
    return numberOfRools;
}

function isRoll (item) {
    return item ==="@"; 
}
