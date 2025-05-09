// solution to long common subsequence
class Solution {
  bruteForce(s1, s2) {
    return this._dfs(s1, s2, 0, 0);
  }

  _dfs(s1, s2, i1, i2) {
    if (i1 === s1.length || i2 === s2.length) {
      return 0;
    }

    let maxLen = Math.max(
      this._dfs(s1, s2, i1 + 1, i2),
      this._dfs(s1, s2, i1, i2 + 1)
    );
    if (s1[i1] === s2[i2]) {
      maxLen = Math.max(maxLen, 1 + this._dfs(s1, s2, i1 + 1, i2 + 1));
    }
    return maxLen;
  }

  memoization(s1, s2) {
    let cache = Array.from({ length: s1.length }, () =>
      Array(s2.length).fill(-1)
    );
    return this._memoizationHelper(s1, s2, 0, 0, cache);
  }

  _memoizationHelper(s1, s2, i1, i2, cache) {
    if (i1 === s1.length || i2 === s2.length) {
      return 0;
    }
    if (cache[i1][i2] !== -1) {
      return cache[i1][i2];
    }

    cache[i1][i2] = Math.max(
      this._memoizationHelper(s1, s2, i1 + 1, i2, cache),
      this._memoizationHelper(s1, s2, i1, i2 + 1, cache)
    );
    if (s1[i1] === s2[i2]) {
      cache[i1][i2] = Math.max(
        cache[i1][i2],
        1 + this._memoizationHelper(s1, s2, i1 + 1, i2 + 1, cache)
      );
    }
    return cache[i1][i2];
  }

  // dynamic programming
  dp(s1, s2) {
    let N = s1.length;
    let M = s2.length;
    let dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= M; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[N][M];
  }

  // optimized dp1
  optimizedDp1(s1, s2) {
    let N = s1.length;
    let M = s2.length;

    let dp = new Array(M + 1).fill(0);
    //init the first row
    for (let i = 1; i <= M; i++) {
      if (s2[i - 1] === s1[0]) {
        dp[i] = 1;
      }
    }

    for (let r = 1; r < N; r++) {
      let nextDp = new Array(M + 1).fill(0);
      for (let c = 1; c <= M; c++) {
        if (s1[r] === s2[c - 1]) {
          nextDp[c] = 1 + dp[c - 1];
        } else {
          nextDp[c] = Math.max(dp[c], nextDp[c - 1]);
        }
      }
      dp = nextDp;
    }
    return dp[M];
  }

  // optimized dp2
}

let text1 = "ezupkr",
  text2 = "ubmrapg";
let solution = new Solution();
console.log(solution.bruteForce(text1, text2)); // 3
console.log(solution.memoization(text1, text2)); // 3
console.log(solution.dp(text1, text2)); // 3
console.log(solution.optimizedDp1(text1, text2)); // 3
