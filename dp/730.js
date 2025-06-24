/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequences = function (s) {
  const MOD = 1000000007;
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1; // each single character is a palindrome
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      let j = i + len - 1;
      if (s[i] !== s[j]) {
        dp[i][j] = (dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]) % MOD;
      } else {
        let low = i + 1;
        let high = j - 1;
        while (low <= high && s[low] !== s[i]) low += 1;
        while (high >= low && s[high] !== s[i]) high -= 1;

        if (low > high) {
          dp[i][j] = (dp[i + 1][j - 1] * 2 + 2) % MOD; // all characters between i and j are different
        } else if (low === high) {
          dp[i][j] = (dp[i + 1][j - 1] * 2 + 1) % MOD; // one character between i and j is same as i
        } else {
          dp[i][j] = (dp[i + 1][j - 1] * 2 - dp[low + 1][high - 1]) % MOD;
        }
      }
      dp[i][j] = (dp[i][j] + MOD) % MOD; // ensure non-negative
    }
  }

  return dp[0][n - 1];
};

let s = "bccb";
console.log(countPalindromicSubsequences(s));
