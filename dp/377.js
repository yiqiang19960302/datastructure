// 377. Combination Sum IV
// Input: nums = [1,2,3], target = 4
// Output: 7
// Explanation:
// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)
// Note that different sequences are counted as different combinations.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// from bottom up
var combinationSum4 = function (nums, target) {
  let dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= target; i++) {
    let res = 0;
    for (let num of nums) {
      if (i >= num) {
        res += dp[i - num];
      }
    }
    dp[i] = res;
  }

  return dp[target];
};

// from top down

function combinationSum4TopDown(nums, target) {
  function dp(target, cache) {
    if (target === 0) {
      return 1;
    }

    if (target < 0) {
      return 0;
    }

    if (cache[target] !== undefined) return cache[target];

    let res = 0;
    for (let num of nums) {
      res += dp(target - num, cache);
    }

    cache[target] = res;
    return cache[target];
  }

  return dp(target, {});
}

let nums = [1, 2, 3],
  target = 4;

console.log(combinationSum4TopDown(nums, target));
