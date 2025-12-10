const fs = require("fs");
const { createCanvas } = require("canvas");

// Lire le fichier input.txt
const input = fs.readFileSync("input.txt", "utf-8");
const lines = input.trim().split("\n");

// Parser les coordonnées
const points = lines.map((line) => {
  const [x, y] = line.split(",").map(Number);
  return { x, y };
});

// Trouver les limites pour normaliser les coordonnées
let minX = Infinity,
  maxX = -Infinity;
let minY = Infinity,
  maxY = -Infinity;

points.forEach((point) => {
  minX = Math.min(minX, point.x);
  maxX = Math.max(maxX, point.x);
  minY = Math.min(minY, point.y);
  maxY = Math.max(maxY, point.y);
});

console.log(`Plage X: ${minX} - ${maxX}`);
console.log(`Plage Y: ${minY} - ${maxY}`);

// Dimensions du canvas
const padding = 100;
const width = 1600;
const height = 1600;

// Créer le canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Fonction pour normaliser les coordonnées
function normalize(point) {
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;
  const scale = Math.min(
    (width - 2 * padding) / rangeX,
    (height - 2 * padding) / rangeY,
  );

  return {
    x: padding + (point.x - minX) * scale,
    y: padding + (point.y - minY) * scale,
  };
}

// Remplir le fond en blanc
ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

// Dessiner la grille de fond
console.log("Dessin de la grille de fond...");
const gridSpacing = 10000; // Espacement de la grille dans l'espace des données
const rangeX = maxX - minX;
const rangeY = maxY - minY;
const scale = Math.min(
  (width - 2 * padding) / rangeX,
  (height - 2 * padding) / rangeY,
);

ctx.strokeStyle = "rgb(220, 220, 220)"; // Gris clair
ctx.lineWidth = 1;

// Normaliser tous les points
const normalizedPoints = points.map(normalize);

// Dessiner les lignes reliant les points
console.log("Dessin des lignes...");
ctx.strokeStyle = "rgb(37, 99, 235)"; // Bleu
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(normalizedPoints[0].x, normalizedPoints[0].y);
for (let i = 1; i < normalizedPoints.length; i++) {
  ctx.lineTo(normalizedPoints[i].x, normalizedPoints[i].y);
}
ctx.stroke();

// Dessiner le rectangle vert reliant les points 220 et 248
console.log("Dessin du rectangle entre les points 220 et 248...");
if (normalizedPoints[220] && normalizedPoints[248]) {
  const p220 = normalizedPoints[220];
  const p248 = normalizedPoints[248];

  ctx.strokeStyle = "rgb(34, 197, 94)"; // Vert
  ctx.lineWidth = 3;
  ctx.strokeRect(
    Math.min(p220.x, p248.x),
    Math.min(p220.y, p248.y),
    Math.abs(p248.x - p220.x),
    Math.abs(p248.y - p220.y),
  );
}

// Dessiner les points et les labels
console.log("Dessin des points...");
normalizedPoints.forEach((point, index) => {
  // Petit cercle pour chaque point
  ctx.fillStyle = "rgb(37, 99, 235)"; // Bleu
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
  ctx.fill();

  // Label tous les 10 points
  if (index % 10 === 0) {
    // Cercle plus grand pour les points marqués
    ctx.fillStyle = "rgb(220, 38, 38)"; // Rouge
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Texte
    ctx.fillStyle = "rgb(220, 38, 38)";
    ctx.font = "bold 14px Arial";
    ctx.fillText(index.toString(), point.x + 8, point.y - 5);
  }
});

// Sauvegarder l'image
console.log("Sauvegarde de l'image...");
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("output.png", buffer);

console.log("✓ Image générée avec succès : output.png");
console.log(`✓ Nombre de points : ${points.length}`);
console.log(`✓ Dimensions : ${width}x${height}px`);
