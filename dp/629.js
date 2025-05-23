// solution to leetcode 629 - K inverse pair array

// dp[i][k] represent the count of array from (1 to i) where has exactly k inverse pairs

// dp[i+1][k] = dp[i][k]+dp[i][k-1]+...+dp[i][k-n+1]

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

const MOD = 10 ** 9 + 7;

var kInversePairs = function (n, k) {
  let dp = new Array(k + 1).fill(0);
  dp[0] = 1;

  for (let i = 2; i <= n; i++) {
    let nextDp = new Array(k + 1).fill(0);
    let prefix_sum = 0;

    for (let j = 0; j <= k; j++) {
      prefix_sum += dp[j];
      if (j >= i) prefix_sum -= dp[j - i];
      nextDp[j] = prefix_sum % MOD;
    }
    dp = nextDp;
  }

  return dp[k];
};
