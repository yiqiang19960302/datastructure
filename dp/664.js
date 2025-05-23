// solution to leetcode 664 - strange printers

// let dp[l][r] represents the number of print required to print the substring from l to r(included)
// we start from substring with length 1
// transition function: dp[l][r] = Math.min(dp[l][r], dp[l][k]+dp[k+1][j]) for l<k<=r
// if s[l] === s[k]: dp[l][k] = dp[l][k-1]

/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function (s) {
  let str = removeDuplicates(s);
  let n = str.length;

  let dp = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let l = n - 1; l >= 0; l--) {
    dp[l][l] = 1;
    for (let r = l + 1; r < n; r++) {
      dp[l][r] = 1 + dp[l + 1][r]; //print str[i] solely

      for (let k = l + 1; k <= r; k++) {
        if (str[k] === str[l]) {
          if (k === r) {
            dp[l][r] = dp[l][r - 1];
          } else {
            dp[l][r] = Math.min(dp[l][r], dp[l][k - 1] + dp[k + 1][r]);
          }
        }
      }
    }
  }

  return dp[0][n - 1];
};

function removeDuplicates(s) {
  let res = [];
  res.push(s[0]);

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      continue;
    } else {
      res.push(s[i]);
    }
  }

  return res.join("");
}

let s = "aaabbb";
console.log(strangePrinter(s));
