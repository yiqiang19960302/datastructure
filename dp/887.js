/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */

var superEggDrop = function (k, n) {};

function bruteForce(k, n) {
  if (k === 1) return n;
  if (n === 0) return 0;

  let res = Infinity;

  for (let i = 1; i <= n; i++) {
    res = Math.min(
      res,
      Math.max(bruteForce(k - 1, i - 1), bruteForce(k, n - i)) + 1
    );
  }

  return res;
}

console.log(bruteForce(2, 6));
