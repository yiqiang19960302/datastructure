// brute force
function bruteForce(n) {
  if (n <= 1) {
    return n;
  }

  return bruteForce(n - 1) + bruteForce(n - 2);
}

// memoization
function memoization(n, cache) {
  if (n <= 1) {
    return n;
  }
  if (n in cache) {
    return cache[n];
  }
  cache[n] = memoization(n - 1, cache) + memoization(n - 2, cache);
  return cache[n];
}

function dp(n) {
  if (n < 2) {
    return n;
  }

  let i = 2;
  let dp = [0, 1];

  while (i <= n) {
    let temp = dp[1];
    dp[1] = dp[0] + dp[1];
    dp[0] = temp;
    i += 1;
  }

  return dp[1];
}
