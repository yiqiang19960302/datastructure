// LEETCODE 313
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
  nums.sort((a, b) => a - b);
  let numToSubsetMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    let subset = [nums[i]];

    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] % nums[j] === 0) {
        let prevSubset = numToSubsetMap.get(nums[j]);
        if (prevSubset.length + 1 > subset.length) {
          subset = [...prevSubset, nums[i]];
        }
      }
    }

    numToSubsetMap.set(nums[i], subset);
  }
  let maxSubset = [];
  for (let subset of numToSubsetMap.values()) {
    if (subset.length > maxSubset.length) {
      maxSubset = subset;
    }
  }

  return maxSubset;
};

// let nums = [4, 8, 10, 240];
// console.log(largestDivisibleSubset(nums));

// let nums2 = [1, 2, 3, 9];
// console.log(largestDivisibleSubset(nums2));

// let nums3 = [1, 2, 4, 8];
// console.log(largestDivisibleSubset(nums3));

// optimized, use better datastructure to store data

var largestDivisibleSubsetOptimized = (nums) => {
  nums.sort((a, b) => a - b);
  let size = nums.length;

  let maxLenArr = new Array(size).fill(1); // record the maximum subset lenth to current idx
  let prevArr = Array.from({ length: size }, (_, i) => i); // record the index of the prev element in current largest subset

  for (let i = 0; i < size; i++) {
    let maxLen = maxLenArr[i];
    let prevIdx = prevArr[i];

    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        if (maxLenArr[j] + 1 > maxLen) {
          maxLen = maxLenArr[j] + 1;
          prevIdx = j;
        }
      }
    }

    maxLenArr[i] = maxLen;
    prevArr[i] = prevIdx;
  }

  let longestIdx = 0;
  for (let i = 1; i < size; i++) {
    if (maxLenArr[i] > maxLenArr[longestIdx]) {
      longestIdx = i;
    }
  }

  let res = [];
  while (longestIdx !== prevArr[longestIdx]) {
    res.push(nums[longestIdx]);
    longestIdx = prevArr[longestIdx];
  }

  res.push(nums[longestIdx]);
  return res.reverse();
};

let nums = [4, 8, 10, 240];
console.log(largestDivisibleSubsetOptimized(nums));

let nums2 = [1, 2, 3, 9];
console.log(largestDivisibleSubsetOptimized(nums2));

let nums3 = [1, 2, 4, 8];
console.log(largestDivisibleSubsetOptimized(nums3));
