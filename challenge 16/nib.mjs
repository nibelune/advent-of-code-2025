import fs from "fs";

const distances = [];
const points = fs
  .readFileSync("input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }

  getClusterSizes() {
    const sizeMap = new Map();
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      sizeMap.set(root, (sizeMap.get(root) || 0) + 1);
    }
    return Array.from(sizeMap.values()).sort((a, b) => b - a);
  }

  getClusterCount() {
    const roots = new Set();
    for (let i = 0; i < this.parent.length; i++) {
      roots.add(this.find(i));
    }
    return roots.size;
  }
}

function calculateDistance(p1, p2) {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2) +
      Math.pow(p2.z - p1.z, 2),
  );
}

for (let a = 0; a < points.length; a++) {
  for (let b = a + 1; b < points.length; b++) {
    const distance = calculateDistance(points[a], points[b]);
    distances.push({ distance, a, b });
  }
}
distances.sort((a, b) => a.distance - b.distance);

const uf = new UnionFind(points.length);

let lastConnection = null;

for (
  let connectionIndex = 0;
  uf.getClusterCount() > 1 && connectionIndex < distances.length;
  connectionIndex++
) {
  const { distance, a, b } = distances[connectionIndex];

  if (uf.union(a, b)) {
    lastConnection = { a, b, distance };
  }
}

console.log(points[lastConnection.a].x * points[lastConnection.b].x);
