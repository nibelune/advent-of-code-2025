import fs from "fs";
const input = fs.readFileSync("input.txt", "utf8");

const batteries = input.split("\n");
batteries.pop();
let counter = 0;

/**
 * - On parcourt chaque chiffre de gauche à droite
 * - Si on trouve un chiffre plus grand que celui au sommet de la pile,
 *   on retire les chiffres plus petits (tant qu'on a des suppressions disponibles)
 * - Cela permet de construire le nombre le plus grand possible
 */

function maxNumberOfLength(line, numberLength = 12) {
  const lineLength = line.length;

  // Si la ligne est plus courte que la longueur demandée, impossible
  if (lineLength < numberLength) return null;

  const stack = []; // Pile pour construire le nombre résultant
  let toRemove = lineLength - numberLength; // Nombre de chiffres à supprimer

  // Parcourir chaque chiffre de la chaîne
  for (const digit of line) {
    // Tant qu'on peut encore supprimer des chiffres
    // et que le chiffre actuel est plus grand que celui au sommet de la pile
    while (
      toRemove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < digit
    ) {
      stack.pop(); // Supprimer le chiffre plus petit
      toRemove--; // Décrémenter le nombre de suppressions restantes
    }
    stack.push(digit); // Ajouter le chiffre actuel à la pile
  }

  // Retourner les premiers 'numberLength' chiffres comme chaîne
  return stack.slice(0, numberLength).join("");
}

for (const battery of batteries) {
  const largestNumber = maxNumberOfLength(battery);
  console.log(largestNumber);
  counter += parseInt(largestNumber, 10);
}

console.log(counter);
