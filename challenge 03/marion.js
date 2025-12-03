// En espérant qu'on puisse y lire toute ma souffrance...

const { readFile } = require('node:fs/promises');

(async () => {

  const input = await readFile('./input.txt', 'utf8');

  const ranges = getAllRanges(input);

  let total = 0;

  for (const elt of ranges) {
    const range = getRange(elt);
    while (range[0] <= range[1]) {
        if (isInvalidId(range[0])) {
            total += range[0];
        }
        range[0]++;
        
    }
  }
  console.log('TOTAL : ', total);
})();


function getAllRanges(input) {
    return input.split(',');
}

function getRange(input) {
    const range = input.split('-');
    return range.map((value) => Number(value));
}

function isInvalidId(input) {

    const inputString = input.toString();

    const inputArray = inputString.split('');
    
    if (inputArray.length > 1 && [...new Set(inputArray)].length === 1) {
        return true;
    }
    for (let i = 2; i<=5; i++) {
        if (inputString.length % i === 0) {
            const part = inputString.slice(0, i);
            const regexp = new RegExp(`(${part}+)\\1+`, 'g');
            const result = inputString.match(regexp);
            if( result ){
                if (result[0] === inputString) {
                    return true;
                }
            }
        }
    }
 
    return false;
}



