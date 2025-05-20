//solution to leetcode 403. Frog Jump

/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
  let cache = new Map();

  // using binary search to find the idx next stone
  // the time complexity of this function is O(logn)
  // return -1 if not found
  function binarySearch(arr, l, target) {
    let left = l;
    let right = arr.length;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (target > arr[mid]) {
        left = mid + 1;
      } else if (target < arr[mid]) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  }

  // i - the index of the current stone
  // k - the previous jump length
  function dp(i, k) {
    if (i === stones.length - 1) {
      return true;
    }

    let key = `${i}-${k}`;
    if (cache.has(key)) {
      return cache.get(key);
    }

    let steps = k > 1 ? [k - 1, k, k + 1] : [k, k + 1]; // get possible jump units for next jump

    let res = false;
    // iterate through all possible jump units
    // and check if can reach the last stone
    for (let step of steps) {
      let nextIdx = binarySearch(stones, i + 1, stones[i] + step);
      if (nextIdx !== -1) {
        if (dp(nextIdx, step)) {
          res = true;
          break;
        }
      }
    }
    cache.set(key, res);

    return res;
  }

  return stones[1] - stones[0] === 1 && dp(1, 1);
};
