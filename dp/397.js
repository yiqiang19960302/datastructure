// solution to leetcode 397. Integer Replacement

let cache = {};
var integerReplacement = function (n) {
  if (n === 1) {
    return 0;
  }
  if (cache[n]) {
    return cache[n];
  }

  if (n % 2 === 0) {
    cache[n] = 1 + integerReplacement(n / 2);
  } else {
    cache[n] =
      1 + Math.min(integerReplacement(n + 1), integerReplacement(n - 1));
  }
  return cache[n];
};
