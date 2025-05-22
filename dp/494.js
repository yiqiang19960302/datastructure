//solution to leetcode 494 - target sum

class FindTargetSumWays {
  recursion(nums, target) {
    function backtrack(idx, sum) {
      if (idx === nums.length) {
        return sum === target ? 1 : 0;
      }

      return (
        backtrack(idx + 1, sum - nums[i]) + backtrack(idx + 1, sum + nums[i])
      );
    }

    backtrack(0, 0);
  }

  dpBottomUp(nums, target) {
    const n = nums.length;
    let dp = Array.from({ length: n + 1 }, () => ({}));
    dp[0][0] = 1;

    for (let i = 0; i < n; i++) {
      for (let prevSum in dp[i]) {
        prevSum = Number(prevSum);
        let count = dp[i][prevSum];

        dp[i + 1][prevSum + nums[i]] =
          (dp[i + 1][prevSum + nums[i]] || 0) + count;
        dp[i + 1][prevSum - nums[i]] =
          (dp[i + 1][prevSum - nums[i]] || 0) + count;
      }
    }
    return dp[n][target] || 0;
  }

  dpOptimized(nums, target) {
    let dp = new Map();
    dp.set(0, 1);

    for (let num of nums) {
      nextDp = new Map();
      for (let [prevRes, count] of dp.entries()) {
        let plusRes = prevRes + num;
        nextDp.set(plusRes, (nextDp.get(plusRes) || 0) + count);
        let minusRes = prevRes - num;
        nextDp.set(minusRes, (nextDp.get(minusRes) || 0) + count);
      }
      dp = nextDp;
    }

    return dp.get(target) || 0;
  }
}
