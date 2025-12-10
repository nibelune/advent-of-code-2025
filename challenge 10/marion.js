import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
debugger;
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input.txt');

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
        return a[0] - b[0]
    })

    freshRanges.forEach((value) => {
        
        if (value[1] < maxId) {
            return;
        }
        else  {

            if (value[0] > maxId) {
                freshIngredientID += value[1] - value[0]+1;
            }
            else {
                freshIngredientID += value[1] - maxId;
            }
        }
                
        if (value[1] > maxId) maxId = value[1];
    })

    console.log("freshIngredientID",freshIngredientID)
})()
