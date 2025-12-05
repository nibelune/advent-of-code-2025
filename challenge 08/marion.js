import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input.txt');

(async () => {
    const file = await open(filePath);

    const storage = {
        shelves: [],
        removeRolls: (listOfRolls) => {
            for (let pos of listOfRolls) {
                storage.shelves[pos[0]][pos[1]] = '.';
            }
        } 
    };
    let result;
    let movedRolls = 0;

    for await (const line of file.readLines()) {
        storage.shelves.push(line.split(''));
    }

    while (result != 0) {
        result = 0;
        const toRemove = [];
        storage.shelves.forEach((line, indexLine) => {
            //console.log(`---Etagère numéro ${indexLine} :`)
            line.forEach((item, indexItem) => {
                //console.log(`-Casier numéro ${indexItem} :`)
                if (isRoll(item)) {
                    const numberOfRools = getRools (storage.shelves, indexLine, indexItem);
                    //console.log('Nombre de rouleaux à proximité: ', numberOfRools)
                    if (numberOfRools < 4) {
                        toRemove.push([indexLine, indexItem])
                        result++;
                    }
                }
            })
        })
        movedRolls += result;
        //console.log('--- Résultat', result);
        //console.log('--- Rouleaux déplacés', movedRolls);
        //console.log('Rouleaux à supprimer : ', toRemove);
        storage.removeRolls(toRemove);
    }
  
})();

function getRools (shelves, indexLine, indexItem) {
    let numberOfRools = 0;

    for (let i = indexLine-1 ; i <= indexLine+1; i++) {
        if (i >= 0 && i < shelves.length) {
            for (let j = indexItem-1; j <= indexItem+1; j++) {
                if (j >= 0) {
                    //console.log('i:', i, ' j:', j, ' shelves[i][j]:', shelves[i][j])
                    if (i != indexLine || j!= indexItem) {
                        if (isRoll(shelves[i][j])) {
                            //console.log('Rouleau trouvé');
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
