// solution to leetcode 740 - delete and earn

/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  let values = new Array(10001).fill(0);
  for (let num of nums) {
    values[num] += num;
  }

  let take = 0;
  let skip = 0;

  for (let i = 0; i < 10001; i++) {
    let takei = skip + values[i];
    let skipi = Math.max(take, skip);
    take = takei;
    skip = skipi;
  }

  return Math.max(take, skip);
};

let nums = [2, 2, 3, 3, 4];
console.log(deleteAndEarn(nums));

// 上面这个解法好像有点不够优雅
