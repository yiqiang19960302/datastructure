// Given a list of N items, and a backpack with a
// limited capacity, return the maximum total profit that
// can be contained in the backpack. The i-th item's profit
// is profit[i] and it's weight is weight[i]. Assume you can
// only add each item to the bag at most one time.

// Brute force Solution
// Time: O(2^n), Space: O(n)
// Where n is the number of items.
function dfs(profit, weight, capacity) {}

function dfsHelper(i, profit, weight, capacity) {
  if (i === profit.length) {
    return 0;
  }

  //skip item i
  let maxProfit = dfsHelper(i, profit, weight, capacity);

  //include item i
  if (capacity - weight[i] >= 0) {
    maxProfit = Math.max(
      maxProfit,
      profit[i] + dfsHelper(i + 1, profit, weight, capacity - weight[i])
    );
  }

  return maxProfit;
}

// Memoization Solution
// Time: O(n * m), Space: O(n * m)
// Where n is the number of items & m is the capacity.
function memoization(profit, weight, capacity) {
  let N = profit.length,
    M = capacity;
  let cache = Array.from({ length: N }, () => new Array(M + 1).fill(-1));
  return memoizationHelper(0, profit, weight, capacity, cache);
}

function memoizationHelper(i, profit, weight, capacity, cache) {
  if (i === profit.length) {
    return 0;
  }

  if (cache[i][capacity] !== -1) {
    return cache[i][capacity];
  }
  //skip item i
  cache[i][capacity] = memoizationHelper(
    i + 1,
    profit,
    weight,
    capacity,
    cache
  );
  //include item i
  let newCap = capacity - weight[i];
  if (newCap >= 0) {
    cache[i][capacity] = Math.max(
      cache[i][capacity],
      profit[i] + memoizationHelper(i, profit, weight, newCap, cache)
    );
  }
  return cache[i][capacity];
}

// Memory optimized Dynamic Programming Solution
// Time: O(n * m), Space: O(m)

function optimizedDp(profit, weight, capacity) {
  let N = profit.length;
  let dp = new Array(capacity + 1).fill(0);

  for (let r = 0; r < N; r++) {
    for (let c = weight[r]; c <= capacity; c++) {
      dp[c] = Math.max(dp[c], profit[r] + dp[c - weight[r]]);
    }
  }

  return dp[capacity];
}
