// solution to leetcode 45 Jump Game II

/**
 * @param {number[]} nums
 * @return {number}
 */

var jump = function (nums) {
  let curIdx = 0;
  let curMaximumIdx = 0;
  let nextReachableIdx = 0;
  let step = 0;

  while (curIdx <= curMaximumIdx) {
    if (curMaximumIdx >= nums.length - 1) {
      return step;
    }

    // update the nextReachableIdx
    nextReachableIdx = Math.max(nextReachableIdx, curIdx + nums[curIdx]);

    if (curIdx === curMaximumIdx) {
      curMaximumIdx = nextReachableIdx;
      step += 1;
    }

    curIdx += 1;
  }

  return -1;
};

let nums = [2, 3, 1, 1, 4];
console.log(jump(nums));
