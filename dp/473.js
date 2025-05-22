// solution to leetcode 473, matchsticks to square

// this question is quite similar to leetcode 698 - the partition to k equal subset sum problem
// in this problem, the k is fixed to 4, so we can use the same approach
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */

var makesquare = function (matchsticks) {
  let sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 !== 0) return false;
  let targetLen = sum / 4;
  let sides = new Array(4).fill(0);
  matchsticks.sort((a, b) => b - a); // sort in descending order

  function dfs(idx) {
    if (idx === matchsticks.length) {
      return sides.every((side) => side === targetLen);
    }

    for (let i = 0; i < 4; i++) {
      if (sides[i] + matchsticks[idx] > targetLen) continue; // skip if it exceeds target length
      if (i > 0 && sides[i] === sides[i - 1]) continue; // avoid duplicate states
      sides[i] += matchsticks[idx]; // add the current matchstick to the side
      if (dfs(idx + 1)) return true; // if it works, return true
      sides[i] -= matchsticks[idx]; // backtrack
    }
    return false; // if no side can accommodate the matchstick, return false
  }

  return dfs(0);
};

let matchsticks = [1, 1, 2, 2, 2];
console.log(makesquare(matchsticks)); // true
