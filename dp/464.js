// Example 1:

// Input: maxChoosableInteger = 10, desiredTotal = 11
// Output: false
// Explanation:
// No matter which integer the first player choose, the first player will lose.
// The first player can choose an integer from 1 up to 10.
// If the first player choose 1, the second player can only choose integers from 2 up to 10.
// The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
// Same with other integers chosen by the first player, the second player will always win.

// Constraints:

// 1 <= maxChoosableInteger <= 20
// 0 <= desiredTotal <= 300
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */

var canIWin = function (maxChoosableInteger, desiredTotal) {
  let sum = ((1 + maxChoosableInteger) * maxChoosableInteger) / 2;
  if (sum < desiredTotal) {
    return false;
  }
  if (desiredTotal === 0) {
    return true;
  }

  let cache = new Map();
  let used = new Array(maxChoosableInteger + 1).fill(false);

  function helper(desiredTotal) {
    if (desiredTotal <= 0) {
      return false;
    }
    let key = format(used);

    if (!cache.has(key)) {
      for (let i = 1; i <= maxChoosableInteger; i++) {
        if (!used[i]) {
          used[i] = true;
          //check whether this lead to a lose of the other player
          if (!helper(desiredTotal - i)) {
            cache.set(key, true);
            used[i] = false;
            return true;
          }
          used[i] = false;
        }
      }
      cache.set(key, false);
    }

    return cache.get(key);
  }

  return helper(desiredTotal);
};

function format(used) {
  let res = 0;
  for (let ele of used) {
    res <<= 1;
    if (ele) {
      res |= 1;
    }
  }
  return res;
}
