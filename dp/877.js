/**
 * @param {number[]} piles
 * @return {boolean}
 */

// some thought
// dp[l][r] has 2 state, [maxFirst, maxSecond] 分别代表从l 到 r 这个区间，先手和后手能拿到的最大值
// dp[l][r][0] = Math.max(nums[l]+dp[l+1][r][1], nums[r]+dp[l][r-1][1])
// dp[l][r][1] = firstPickLeft? dp[l+1][r][0]:dp[l][r-1][0]

var stoneGame = function (piles) {
  let n = piles.length;
  let dp = Array.from({ length: n }, () => new Array(n).fill([0, 0]));

  for (let l = n - 1; l >= 0; l--) {
    dp[l][l] = [piles[l], 0];
    for (let r = l + 1; r < n; r++) {
      let pickLeft = piles[l] + dp[l + 1][r][1];
      let pickRight = piles[r] + dp[l][r - 1][1];
      if (pickLeft > pickRight) {
        dp[l][r] = [pickLeft, dp[l + 1][r][0]];
      } else {
        dp[l][r] = [pickRight, dp[l][r - 1][0]];
      }
    }
  }
  return dp[0][n - 1][0] > dp[0][n - 1][1];
};

let piles = [5, 3, 4, 5];
console.log(stoneGame(piles));
