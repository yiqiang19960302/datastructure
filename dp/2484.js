// solution to leetcode 2484. Count Palindromic Subsequence
// count the nuber of palindromic subsequence with length 5

// dp[i][j][l] represents the count of length l palindromic subsequence start from i to j (both included)

// dp[i][j][l] += dp[i+1][j][l]+dp[i][j-1][l]-dp[i+1][j-1][l]
// if s[i]===s[j] dp[i][j][l] +=dp[i][j][l-2]

/**
 * @param {string} s
 * @return {number}
 */

var countPalindromes = function (s) {
  const MOD = 1e9 + 7;
  const n = s.length;
  const L = 2;

  // dp[i][j][k] = number of palindromic subsequences in s[i..j] with length k
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array(L + 1).fill(0))
  );

  // Base case: length = 1
  for (let i = 0; i < n; i++) {
    dp[i][i][1] = 1;
  }

  // Fill the table for all substring lengths >= 2
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;
      for (let l = 1; l <= Math.min(L, j - i + 1); l++) {
        // Case 1: s[i] === s[j] and length >= 2
        if (s[i] === s[j] && l >= 2) {
          if (l - 2 > 0) {
            dp[i][j][l] = (dp[i][j][l] + dp[i + 1][j - 1][l - 2]) % MOD;
          } else {
            dp[i][j][l] = (dp[i][j][l] + 1) % MOD; // count the pair itself
          }
        }

        // Case 2: include subsequences from dp[i+1][j][l]
        dp[i][j][l] = (dp[i][j][l] + dp[i + 1][j][l]) % MOD;

        // Case 3: include subsequences from dp[i][j-1][l]
        dp[i][j][l] = (dp[i][j][l] + dp[i][j - 1][l]) % MOD;

        // Case 4: subtract overlapping subsequences from dp[i+1][j-1][l]
        dp[i][j][l] = (dp[i][j][l] - dp[i + 1][j - 1][l] + MOD) % MOD;
      }
    }
  }

  return dp[0][n - 1][L];
};

let s = "9999900000";
console.log(countPalindromes(s));
