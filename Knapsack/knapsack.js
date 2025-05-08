class Solution {
  bruteForce(profit, weight, capacity) {
    function dfs(i, cap) {
      if (i === profit.length || cap <= 0) {
        return 0;
      }

      let maxProfit = dfs(i + 1, cap);
      let newCap = cap - weight[i];
      if (newCap >= 0) {
        maxProfit = Math.max(maxProfit, profit[i] + dfs(i + 1, newCap));
      }
      return maxProfit;
    }
    return dfs(0, capacity);
  }

  maximumProfit(profit, weight, capacity) {
    let n = profit.length;
    let dp = new Array(capacity + 1).fill(0);
    // init the first row
    for (let i = 1; i <= capacity; i++) {
      if (weight[0] <= i) {
        dp[i] = profit[0];
      }
    }

    for (let i = 1; i < n; i++) {
      for (let j = capacity; j > 0; j--) {
        if (weight[i] <= j) {
          dp[j] = Math.max(dp[j], profit[i] + dp[j - weight[i]]);
        }
      }
    }

    return dp[capacity];
  }

  optimizedDp(profit, weight, capacity) {
    let n = profit.length;
    let dp = new Array(capacity + 1).fill(0);

    // init the first row
    for (let i = 1; i <= capacity; i++) {
      if (weight[0] <= i) {
        dp[i] = profit[0];
      }
    }

    for (let i = 1; i < n; i++) {
      let curRow = new Array(capacity + 1).fill(0);
      for (let c = 1; c <= capacity; c++) {
        if (weight[i] <= c) {
          curRow[c] = Math.max(curRow[c], profit[i] + dp[c - weight[i]]);
        } else {
          curRow[c] = dp[c];
        }
      }
      dp = curRow;
    }

    return dp[capacity];
  }

  memoization(profit, weight, capacity) {
    let n = profit.length;
    let cache = Array.from({ length: n }, () =>
      new Array(capacity + 1).fill(-1)
    );

    return this._memoizationHelper(0, profit, weight, capacity, cache);
  }

  _memoizationHelper(i, profit, weight, capacity, cache) {
    if (i === profit.length) {
      return 0;
    }

    if (cache[i][capacity] !== -1) {
      return cache[i][capacity];
    }

    //skip item i
    cache[i][capacity] = this._memoizationHelper(
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
        profit[i] +
          this._memoizationHelper(i + 1, profit, weight, newCap, cache)
      );
    }
    return cache[i][capacity];
  }
}

let profit = [4, 4, 7, 1];
let weight = [5, 2, 3, 1];
let capacity = 8;

let s = new Solution();
console.log(s.maximumProfit(profit, weight, capacity)); // 12
console.log(s.bruteForce(profit, weight, capacity)); // 12
console.log(s.optimizedDp(profit, weight, capacity)); // 12
console.log(s.memoization(profit, weight, capacity)); // 12
