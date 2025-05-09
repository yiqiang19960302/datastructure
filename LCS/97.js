//Leetcode 97, interleaving string
// Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

// An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:

// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// |n - m| <= 1
// The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
// Note: a + b is the concatenation of strings a and b.

// Example 1:

// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// Output: true
// Explanation: One way to obtain s3 is:
// Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
// Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
// Since s3 can be obtained by interleaving s1 and s2, we return true.
// Example 2:

// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
// Output: false
// Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
// Example 3:

// Input: s1 = "", s2 = "", s3 = ""
// Output: true

class Solution {
  bruteForce(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) {
      return false;
    }
    return this._dfs(s1, s2, s3, 0, 0, 0);
  }

  _dfs(s1, s2, s3, i1, i2, i3) {
    if (i3 === s3.length) {
      return i1 === s1.length && i2 === s2.length;
    }
    if (i1 < s1.length && s1[i1] === s3[i3]) {
      if (this._dfs(s1, s2, s3, i1 + 1, i2, i3 + 1)) {
        return true;
      }
    }

    if (i2 < s2.length && s2[i2] === s3[i3]) {
      if (this._dfs(s1, s2, s3, i1, i2 + 1, i3 + 1)) {
        return true;
      }
    }

    return false;
  }

  // optimized dp
  optimizedDp(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) {
      return false;
    }

    [s1, s2] = [s1, s2].sort((a, b) => a.length - b.length);
    let M = s1.length;
    let N = s2.length;

    let dp = new Array(M + 1).fill(false);
    // init the first row
    dp[0] = true;
    for (let c = 1; c <= M; c++) {
      dp[c] = dp[c - 1] && s1[c - 1] === s3[c - 1];
    }

    for (let r = 0; r < N; r++) {
      let nextDp = new Array(M + 1).fill(false);
      nextDp[0] = dp[0] && s2[r] === s3[r];

      for (let c = 1; c <= M; c++) {
        nextDp[c] =
          (nextDp[c - 1] && s1[c - 1] === s3[r + c]) ||
          (dp[c] && s2[r] === s3[r + c]);
      }

      dp = nextDp;
    }

    return dp[M];
  }
}

let testCases = [
  ["aabcc", "dbbca", "aadbbcbcac"],
  ["aabcc", "dbbca", "aadbbbaccc"],
  ["", "", ""],
  ["a", "b", "ab"],
  ["abc", "def", "abcdef"],
  ["abc", "def", "abdecf"],
];

let s = new Solution();
for (let i = 0; i < testCases.length; i++) {
  let [s1, s2, s3] = testCases[i];
  console.log(`Test case ${i + 1}:`);
  console.log(
    `s1: ${s1}, s2: ${s2}, s3: ${s3} = ${s.bruteForce(s1, s2, s3)}\n\n`
  );
}
