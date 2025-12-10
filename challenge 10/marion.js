import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
debugger;
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input-test.txt');

(async () => {
    const file = await open(filePath);

    let freshRanges = [];
    let isIngredientPart = false;
    let freshIngredientID = 0;
    let maxId = 0;
    
    for await (const line of file.readLines()) {

        if (line.trim() == "") {
            isIngredientPart = true;
            continue;
        }
        if (!isIngredientPart) {
            let range = line.split('-');
            range = range.map((value) => Number.parseInt(value));
            freshRanges.push(range);
        }
    }

    freshRanges.sort((a, b) => {
        return a[0] - b[0];
    })

    freshRanges.forEach((value, index) => {
        
        if (value[1] > maxId) maxId = value[1]; // c'est ici que ça ne va pas... je n'ai pas la bonne logique pour stocker jusqu'où mon comptage doit aller...
        if (index < freshRanges.length-1) {
            if (value[1] < freshRanges[index+1][0])
                freshIngredientID += value[1] - value[0]+1;
            else 
                freshIngredientID += freshRanges[index+1][0] - value[0];
        }
        else {
            freshIngredientID += value[1] - value[0]+1;
            freshIngredientID += maxId - value[1];
        }
        
    })

    console.log("freshIngredientID",freshIngredientID);
})()
