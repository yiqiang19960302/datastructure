// You are given an integer array nums. Two players are playing a game with this array: player 1 and player 2.

// Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of 0. At each turn,
// the player takes one of the numbers from either end of the array (i.e., nums[0] or nums[nums.length - 1]) which reduces the size of the array by 1.
//  The player adds the chosen number to their score. The game ends when there are no more elements in the array.

// Return true if Player 1 can win the game.
// If the scores of both players are equal, then player 1 is still the winner,
// and you should also return true. You may assume that both players are playing optimally.

// Example 1:

// Input: nums = [1,5,2]
// Output: false
// Explanation: Initially, player 1 can choose between 1 and 2.
// If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2).
// So, final score of player 1 is 1 + 2 = 3, and player 2 is 5.
// Hence, player 1 will never be the winner and you need to return false.
// Example 2:

// Input: nums = [1,5,233,7]
// Output: true
// Explanation: Player 1 first chooses 1. Then player 2 has to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.
// Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Approach: dp from top down
var predictTheWinner = function (nums) {
  let n = nums.length;
  let dp = new Array(n).fill(0).map(() => new Array(n).fill(-1));

  function dfs(l, r) {
    if (l > r) return 0;
    if (l === r) return nums[l];
    if (dp[l][r] !== -1) return dp[l][r];

    let pickLeft = nums[l] + Math.min(dfs(l + 2, r), dfs(l + 1, r - 1));
    let pickRight = nums[r] + Math.min(dfs(l + 1, r - 1), dfs(l, r - 2));
    dp[l][r] = Math.max(pickLeft, pickRight);
    return dp[l][r];
  }

  let total = nums.reduce((a, b) => a + b, 0);
  let player1Score = dfs(0, n - 1);
  return player1Score >= total - player1Score;
};

// Approach: dp from bottom up
// 1 5 233 7

// dp[l][r] -> denote the max score player 1 can get from nums[l] to nums[r]

// l\r  0   1   2   3

// 0    1

// 1    0   5

// 2    0   0   233

// 3    0   0   0   7

function predictTheWinnerBottomUp(nums) {
  let n = nums.length;
  //dp[l][r] represent the maximum player one can get from l to r
  let dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 1; len <= n; len++) {
    for (let l = 0; l <= n - len; i++) {
      let r = l + len - 1;
      let a = l + 1 < n && r - 1 > +0 ? dp[l + 1][r - 1] : 0;
      let b = l + 2 < n ? dp[l + 2][r] : 0;
      let c = r - 2 >= 0 ? dp[l][r - 2] : 0;

      dp[l][r] = Math.max(nums[l] + Math.min(a, b), nums[r] + Math.min(a, c));
    }
  }

  let total = nums.reduce((a, b) => a + b, 0);

  return dp[0][n - 1] >= total - dp[0][n - 1];
}
