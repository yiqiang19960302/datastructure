// Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.

// A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

// Example 1:

// Input: str1 = "abac", str2 = "cab"
// Output: "cabac"
// Explanation:
// str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
// str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
// The answer provided is the shortest such string that satisfies these properties.
// Example 2:

// Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
// Output: "aaaaaaaa"

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of lowercase English letters.

class Solution {
  bruteForce(str1, str2) {
    let res = null;

    function dfs(i, j, s) {
      if (i === str1.length && j === str2.length) {
        if (res === null || s.length < res.length) {
          res = s;
        }
        return;
      } else if (i === str1.length) {
        dfs(i, j + 1, s + str2[j]);
      } else if (j === str2.length) {
        dfs(i + 1, j, s + str1[i]);
      } else {
        if (str1[i] === str2[j]) {
          dfs(i + 1, j + 1, s + str1[i]);
        } else {
          dfs(i + 1, j, s + str1[i]);
          dfs(i, j + 1, s + str2[j]);
        }
      }
    }

    dfs(0, 0, "");
    return res;
  }

  // memoization
  memoization(str1, str2) {
    let cache = new Array(str1.length + 1)
      .fill(null)
      .map(() => new Array(str2.length + 1).fill(null));

    function dfs(i, j) {
      if (cache[i][j] !== null) {
        return cache[i][j];
      }
      if (i === str1.length && j === str2.length) {
        return "";
      } else if (i === str1.length) {
        return str2.slice(j);
      } else if (j === str2.length) {
        return str1.slice(i);
      } else if (str1[i] === str2[j]) {
        return (cache[i][j] = str1[i] + dfs(i + 1, j + 1));
      } else {
        let option1 = str1[i] + dfs(i + 1, j);
        let option2 = str2[j] + dfs(i, j + 1);
        return (cache[i][j] =
          option1.length < option2.length ? option1 : option2);
      }
    }

    return dfs(0, 0);
  }

  // dynamic programming

  dp(str1, str2) {
    let i = 0;
    let j = 0;
    let res = "";

    for (let c of this.lcs(str1, str2)) {
      while (str1[i] !== c) {
        res += str1[i++];
      }

      while (str2[j] !== c) {
        res += str2[j++];
      }
      res += c;
      i++;
      j++;
    }

    return res + str1.substring(i) + str2.substring(j);
  }

  lcs(str1, str2) {
    let N = str1.length;
    let M = str2.length;
    let dp = new Array(M + 1).fill("");

    for (let r = 0; r < N; r++) {
      let nextRow = new Array(M + 1).fill("");
      for (let c = 1; c <= M; c++) {
        if (str1[r] === str2[c - 1]) {
          nextRow[c] = dp[c - 1] + str1[r];
        } else {
          nextRow[c] =
            nextRow[c - 1].length < dp[c].length ? dp[c] : nextRow[c - 1];
        }
      }
      dp = nextRow;
    }

    return dp[M];
  }
}

let testCases = [
  ["abac", "cab"],
  ["aaaaaaaa", "aaaaaaaa"],
];
let s = new Solution();
testCases.forEach((testCase) => {
  console.log(s.bruteForce(...testCase));
  console.log(s.memoization(...testCase));
  console.log(s.dp(...testCase));
});
