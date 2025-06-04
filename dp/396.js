// solution to leetcode 396, rotate function

// Example 1:

// Input: nums = [4,3,2,6]
// Output: 26
// Explanation:
// F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
// F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
// F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
// F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
// So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function (nums) {
  let res = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    res += nums[i] * i;
  }
  let n = nums.length - 1;

  let idx = nums.length - 1;
  let prevRes = res;
  while (idx >= 0) {
    prevRes = prevRes - nums[idx] * n + sum - nums[idx];
    res = Math.max(res, prevRes);
    idx -= 1;
  }

  return res;
};

let nums = [4, 3, 2, 6];

console.log(maxRotateFunction(nums));
