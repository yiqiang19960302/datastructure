// solution to leetcode 583 - deletion operation for two strings

// find the minimum deletion required to make the 2 string the same
// which is equivlent to find the longest common subsequence of the 2 strings
// and use the total length minus the longest common subsequence

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  [word1, word2] =
    word1.length > word2.length ? [word1, word2] : [word2, word1];

  let ROWS = word1.length;
  let COLS = word2.length;

  let dp = new Array(COLS + 1).fill(0);

  for (let r = 0; r < ROWS; r++) {
    let nextDp = new Array(COLS + 1).fill(0);
    for (let c = 1; c <= COLS; c++) {
      nextDp[c] = Math.max(nextDp[c - 1], dp[c]);

      if (word1[r] === word2[c - 1]) {
        nextDp[c] = Math.max(nextDp[c], dp[c - 1] + 1);
      }
    }
    dp = nextDp;
  }

  let lcs = dp[COLS];

  return word1.length + word2.length - lcs * 2;
};
