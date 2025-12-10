import fs from "fs";

const cases = fs
  .readFileSync("input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });

function countCells(pointA, pointB) {
  const width = Math.abs(pointB.x - pointA.x) + 1;
  const height = Math.abs(pointB.y - pointA.y) + 1;
  return width * height;
}

function isPointInside(point, polygonPoints) {
  let inside = false;
  for (
    let i = 0, j = polygonPoints.length - 1;
    i < polygonPoints.length;
    j = i++
  ) {
    const xi = polygonPoints[i].x,
      yi = polygonPoints[i].y;
    const xj = polygonPoints[j].x,
      yj = polygonPoints[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointOnEdge(point, polygonPoints) {
  for (let i = 0; i < polygonPoints.length; i++) {
    const p1 = polygonPoints[i];
    const p2 = polygonPoints[(i + 1) % polygonPoints.length];

    if (p1.x === p2.x && p1.x === point.x) {
      if (point.y >= Math.min(p1.y, p2.y) && point.y <= Math.max(p1.y, p2.y)) {
        return true;
      }
    } else if (p1.y === p2.y && p1.y === point.y) {
      if (point.x >= Math.min(p1.x, p2.x) && point.x <= Math.max(p1.x, p2.x)) {
        return true;
      }
    }
  }
  return false;
}

function isVerticalSideInside(x, topRight, bottomLeft, polygonPoints) {
  const minY = Math.min(bottomLeft.y, topRight.y);
  const maxY = Math.max(bottomLeft.y, topRight.y);

  for (let y = minY; y <= maxY; y++) {
    const point = { x, y };

    if (
      !isPointOnEdge(point, polygonPoints) &&
      !isPointInside(point, polygonPoints)
    ) {
      return false;
    }
  }

  return true;
}

function isLeftSideInside(topRight, bottomLeft, polygonPoints) {
  return isVerticalSideInside(
    bottomLeft.x,
    topRight,
    bottomLeft,
    polygonPoints,
  );
}

function isRightSideInside(topRight, bottomLeft, polygonPoints) {
  return isVerticalSideInside(topRight.x, topRight, bottomLeft, polygonPoints);
}

function findLargestInscribedRectangle() {
  const topRightIndex = 248;
  const topRight = cases[topRightIndex];

  let maxSurface = 0;
  let bestBottomLeft = null;
  let bestBottomLeftIndex = null;

  for (let i = 240; i >= 190; i--) {
    const bottomLeft = cases[i];
    if (bottomLeft.x <= topRight.x) {
      const isLeftInside = isLeftSideInside(topRight, bottomLeft, cases);
      const isRightInside = isRightSideInside(topRight, bottomLeft, cases);

      if (isLeftInside && isRightInside) {
        const surface = countCells(bottomLeft, topRight);

        if (surface > maxSurface) {
          maxSurface = surface;
          bestBottomLeft = bottomLeft;
          bestBottomLeftIndex = i;
        }
      }
    }
  }

  return {
    topRight,
    topRightIndex,
    bottomLeft: bestBottomLeft,
    bottomLeftIndex: bestBottomLeftIndex,
    surface: maxSurface,
  };
}

const result = findLargestInscribedRectangle();

console.log(result.bottomLeftIndex, result.surface);
