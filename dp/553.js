// solution to leetcode 553 optimal division

/**
 * @param {number[]} nums
 * @return {string}
 */
var optimalDivision = function (nums) {
  let n = nums.length;

  function dp(left, right) {
    if (left === right) {
      return [nums[left], nums[left]];
    }

    let min = 1001;
    let max = 0;

    for (let i = left; i < right; i++) {
      let [leftMax, leftMin] = dp(left, i);
      let [rightMax, rightMin] = dp(i + 1, right);
      max = Math.max(max, leftMax / rightMin);
      min = Math.min(min, leftMin / rightMax);
    }

    return [max, min];
  }

  let [max, _] = dp(0, nums.length - 1);
  return max;
};
let nums = [1000, 100, 10, 2];
console.log(optimalDivision(nums));
