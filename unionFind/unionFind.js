class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]]; // Path compression
      x = this.parent[x];
    }

    return x;
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}
