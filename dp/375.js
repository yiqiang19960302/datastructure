//solution to leetcode 375

/**
 * @param {number} n
 * @return {number}
 */

var getMoneyAmount = function (n) {
  let cache = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  function dp(l, r, cache) {
    if (r - l <= 0) {
      return 0;
    }

    if (cache[l][r] !== -1) {
      return cache[l][r];
    }

    let res = Infinity;

    for (let i = l; i <= r; i++) {
      let temp = i + Math.max(dp(l, i - 1, cache), dp(i + 1, r, cache));
      res = Math.min(res, temp);
    }

    cache[l][r] = res;

    return res;
  }

  return dp(1, n, cache);
};

console.log(getMoneyAmount(10)); // 16
