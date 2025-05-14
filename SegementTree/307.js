var TreeNode = function (val, L, R) {
  this.val = val;
  this.left = null;
  this.right = null;
  this.L = L;
  this.R = R;
};

/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.root = NumArray.build(nums, 0, nums.length - 1);
};

NumArray.build = function (nums, L, R) {
  if (L === R) {
    return new TreeNode(nums[L], L, R);
  }

  let root = new TreeNode(0, L, R);
  let M = (L + R) >> 1;
  root.left = NumArray.build(nums, L, M);
  root.right = NumArray.build(nums, M + 1, R);
  root.val = root.left.val + root.right.val;
  return root;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  function updateHelper(root, index, val) {
    if (root.L === root.R) {
      root.val = val;
      return;
    }

    let M = (root.L + root.R) >> 1;
    if (index > M) {
      updateHelper(root.right, index, val);
    } else {
      updateHelper(root.left, index, val);
    }
    root.val = root.left.val + root.right.val;
  }

  updateHelper(this.root, index, val);
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  function sumRangeHelper(root, left, right) {
    if (left === root.L && right === root.R) {
      return root.val;
    }

    let M = (root.L + root.R) >> 1;
    if (left > M) {
      return sumRangeHelper(root.right, left, right);
    } else if (right <= M) {
      return sumRangeHelper(root.left, left, right);
    } else {
      return (
        sumRangeHelper(root.left, left, M) +
        sumRangeHelper(root.right, M + 1, right)
      );
    }
  }
  return sumRangeHelper(this.root, left, right);
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
