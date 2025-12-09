import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
debugger;
const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'input.txt');

(async () => {
    const file = await open(filePath);

    const freshRanges = [];
    const ingredients = [];
    let isIngredientPart = false;
    let freshIngredients = 0;

    
    for await (const line of file.readLines()) {

        if (line.trim() == "") {
            isIngredientPart = true;
            continue;
        }
        if (!isIngredientPart) {
            freshRanges.push(line.split('-'));
        }
        if (isIngredientPart) {
            ingredients.push(line);
        }
    }

    for (let ingredient of ingredients) {
        for (let range of freshRanges) {
            if ( Number.parseInt(ingredient) >= Number.parseInt(range[0]) 
                && Number.parseInt(ingredient) <= Number.parseInt(range[1])) {
                freshIngredients++;
                break;
            }
        }
    }

    console.log("freshIngredients :",freshIngredients)
})()
