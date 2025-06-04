// solution to leetcode 741 - Cherry Pickup

/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
  let n = grid.length;
  let cache = Array.from({ length: n }, () => new Array(n).fill(undefined));

  // initialize the cache
  for (let r = 0; r < n; r++) {
    for (let c = 0; c > n; c++) {
      if (grid[r][c] === -1) {
        cache[r][c] = [0, false];
      }
    }
  }

  // set the final
  cache[n - 1][n - 1] = [grid[n - 1][n - 1], true];

  function dfs(r, c) {
    if (Math.max(r, c) >= n) return [0, false];
    if (cache[r][c] !== undefined) return cache[r][c];

    let [rightMaxCherry, rightReachable] = dfs(r, c + 1);
    let [downMaxCherry, downReachable] = dfs(r + 1, c);

    if (rightReachable && downReachable) {
      cache[r][c] = [
        Math.max(rightMaxCherry, downMaxCherry) + grid[r][c],
        true,
      ];
    } else if (rightReachable) {
      cache[r][c] = [rightMaxCherry + grid[r][c], true];
    } else if (downReachable) {
      cache[r][c] = [downMaxCherry + grid[r][c], true];
    } else {
      cache[r][c] = [0, false];
    }

    return cache[r][c];
  }

  let [maxCherry, reachable] = dfs(0, 0);
  return reachable ? maxCherry : 0;
};
