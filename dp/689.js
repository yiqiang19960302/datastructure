// solution to leetcode 689. Maximum Sum of 3 Non-Overlapping Subarrays
// Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.

// Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

// Example 1:

// Input: nums = [1,2,1,2,6,7,5,1], k = 2
// Output: [0,3,5]
// Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
// We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically smaller.
// Example 2:

// Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
// Output: [0,2,4]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function (nums, k) {
  let sum = [];
  let total = 0;

  for (let i = 0; i < k - 1; i++) {
    total += nums[i];
  }

  for (let i = k - 1; i < nums.length; i++) {
    total += nums[i];
    sum.push(total);
    total -= nums[i - k + 1];
  }

  let leftMaxIndex = new Array(sum.length).fill(0);

  for (let i = 1; i < sum.length; i++) {
    if (sum[i] > sum[leftMaxIndex[i - 1]]) {
      leftMaxIndex[i] = i;
    } else {
      leftMaxIndex[i] = leftMaxIndex[i - 1];
    }
  }

  let rightMaxIndex = new Array(sum.length).fill(sum.length - 1);

  for (let i = sum.length - 2; i >= 0; i--) {
    if (sum[i] >= sum[rightMaxIndex[i + 1]]) {
      rightMaxIndex[i] = i;
    } else {
      rightMaxIndex[i] = rightMaxIndex[i + 1];
    }
  }

  let max = 0;
  let res = [];

  for (let i = k; i < sum.length - k; i++) {
    let l = leftMaxIndex[i - k];
    let r = rightMaxIndex[i + k];
    let total = sum[l] + sum[i] + sum[r];

    if (total > max) {
      max = total;
      res = [l, i, r];
    }
  }
  return res;
};

let nums = [1, 2, 1, 2, 1, 2, 1, 2, 1],
  k = 2;

console.log(maxSumOfThreeSubarrays(nums, k));
