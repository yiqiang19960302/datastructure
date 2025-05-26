// solution to leetcode 55. Jump Game

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxJump = 0;
  let cur = 0;

  while (cur <= maxJump) {
    // for every step, try to increase the maximum reachable idx
    if (cur + nums[cur] > maxJump) {
      maxJump = cur + nums[cur];
    }

    // check whether the last idx is in range
    if (maxJump >= nums.length - 1) {
      return true;
    }
    cur += 1;
  }

  return false;
};
