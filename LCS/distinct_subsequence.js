// Leetcode 115
// Given two strings s and t, return the number of distinct subsequences of s which equals t.

// The test cases are generated so that the answer fits on a 32-bit signed integer.

// Example 1:

// Input: s = "rabbbit", t = "rabbit"
// Output: 3
// Explanation:
// As shown below, there are 3 ways you can generate "rabbit" from s.
// rabbbit
// rabbbit
// rabbbit
// Example 2:

// Input: s = "babgbag", t = "bag"
// Output: 5
// Explanation:
// As shown below, there are 5 ways you can generate "bag" from s.
// babgbag
// babgbag
// babgbag
// babgbag
// babgbag

class Solution {
  // brute force
  bruteForce(s, t) {
    if (s.length < t.length) {
      return 0;
    }
    return this._dfs(s, t, 0, 0);
  }

  _dfs(s, t, i1, i2) {
    if (i2 === t.length) {
      return 1;
    }
    if (i1 === s.length) {
      return 0;
    }

    let count = this._dfs(s, t, i1 + 1, i2); // skip s[i1]
    if (s[i1] === t[i2]) {
      count += this._dfs(s, t, i1 + 1, i2 + 1); // include s[i1]
    }

    return count;
  }

  // memoization
  memoization(s, t) {
    if (s.length < t.length) {
      return 0;
    }

    let N = t.length;
    let M = s.length;
    let cache = Array.from({ length: M }, () => new Array(N).fill(-1));

    return this._memoizationHelper(s, t, 0, 0, cache);
  }

  _memoizationHelper(s, t, i1, i2, cache) {
    if (i2 === t.length) {
      return 1;
    }

    if (i1 === s.length) {
      return 0;
    }

    if (cache[i1][i2] !== -1) {
      return cache[i1][i2];
    }

    cache[i1][i2] = this._memoizationHelper(s, t, i1 + 1, i2, cache); // skip s[i1]
    if (s[i1] === t[i2]) {
      cache[i1][i2] += this._memoizationHelper(s, t, i1 + 1, i2 + 1, cache); // include s[i1]
    }

    return cache[i1][i2];
  }

  // dynamic programming
  dp(s, t) {
    let N = t.length;
    let M = s.length;

    let dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

    // init the first row to 1
    for (let c = 0; c <= M; c++) {
      dp[0][c] = 1;
    }

    for (let r = 1; r <= N; r++) {
      for (let c = 1; c <= M; c++) {
        dp[r][c] = dp[r][c - 1];

        if (t[r - 1] === s[c - 1]) {
          dp[r][c] += dp[r - 1][c - 1];
        }
      }
    }

    return dp[N][M];
  }

  // optimized dp
  optimizedDp(s, t) {
    let N = t.length;
    let M = s.length;

    let dp = new Array(M + 1).fill(1);

    for (let r = 0; r < N; r++) {
      let nextDp = new Array(M + 1).fill(0);
      for (let c = 1; c <= M; c++) {
        nextDp[c] = nextDp[c - 1];
        if (t[r] === s[c - 1]) {
          nextDp[c] += dp[c - 1];
        }
      }
      dp = nextDp;
    }

    return dp[M];
  }
}

let s = "babgbag",
  t = "bag";
let solution = new Solution();
console.log(solution.bruteForce(s, t));
console.log(solution.memoization(s, t));
console.log(solution.dp(s, t));
console.log(solution.optimizedDp(s, t));
