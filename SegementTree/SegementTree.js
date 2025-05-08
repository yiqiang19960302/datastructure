class SegementTree {
  constructor(total, L, R) {
    this.sum = total;
    this.left = null;
    this.right = null;
    this.L = L;
    this.R = R;
  }

  static build(nums, L, R) {
    if (L === R) {
      return new SegementTree(nums[L], L, R);
    }

    let M = Math.floor((L + R) / 2);
    let root = new SegementTree(0, L, R);
    root.left = SegementTree.build(nums, L, M);
    root.right = SegementTree.build(nums, M + 1, R);
    root.sum = root.left.sum + root.right.sum;
    return root;
  }

  update(index, val) {
    if (this.L === this.R) {
      this.sum = val;
      return;
    }

    let M = Math.floor((this.L + this.R) / 2);
    if (index <= M) {
      this.left.update(index, val);
    } else {
      this.right.update(index, val);
    }

    this.sum = this.left.sum + this.right.sum;
  }

  rangeQuery(L, R) {
    if (L === this.L && R === this.R) {
      return this.sum;
    }

    let M = Math.floor((this.L + this.R) / 2);
    if (L > M) {
      return this.right.rangeQuery(L, R);
    } else if (R <= M) {
      return this.left.rangeQuery(L, R);
    } else {
      return this.left.rangeQuery(L, M) + this.right.rangeQuery(M + 1, R);
    }
  }
}
