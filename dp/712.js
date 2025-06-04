// solution to leetcode 712, minimum ascii delete sum for two strings

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */

var minimumDeleteSum = function (s1, s2) {
  let sumS1 = 0;
  let sumS2 = 0;

  for (let i = 0; i < s1.length; i++) {
    sumS1 += s1.charCodeAt(i);
  }

  for (let i = 0; i < s2.length; i++) {
    sumS2 += s2.charCodeAt(i);
  }

  let row = s1.length,
    col = s2.length;
  let dp = new Array(col + 1).fill(0);

  for (let r = 0; r < row; r++) {
    let newDp = new Array(col + 1).fill(0);
    for (let c = 1; c <= col; c++) {
      newDp[c] = Math.max(newDp[c - 1], dp[c]);
      if (s2[c - 1] === s1[r]) {
        newDp[c] = Math.max(newDp[c], dp[c - 1] + s1.charCodeAt(r));
      }
    }

    dp = newDp;
  }

  return sumS1 + sumS2 - 2 * dp[col];
};

let s1 = "sea",
  s2 = "eat";

console.log(minimumDeleteSum(s1, s2));
