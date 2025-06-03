//solution to leetcode 673 - number of longest increasing subsequence
// Given an integer array nums, return the number of longest increasing subsequences.

// Notice that the sequence has to be strictly increasing.

// Example 1:

// Input: nums = [1,3,5,4,7]
// Output: 2
// Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  let longest = 1;
  let longestCount = 1;

  let n = nums.length;
  let dp = new Array(n).fill(1);
  let dpCount = new Array(n).fill(1);

  for (let i = 1; i < nums.length; i++) {
    let currentLongest = 1;
    let currentLongestCount = 1;

    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        let len = dp[j] + 1;
        if (len > currentLongest) {
          currentLongest = len;
          currentLongestCount = dpCount[j];
        } else if (len === currentLongest) {
          currentLongestCount += dpCount[j];
        }
      }
    }

    dp[i] = currentLongest;
    dpCount[i] = currentLongestCount;

    if (currentLongest > longest) {
      longest = currentLongest;
      longestCount = currentLongestCount;
    } else if (currentLongest === longest) {
      longestCount += currentLongestCount;
    }
  }

  return longestCount;
};

let nums = [1, 2, 4, 3, 5, 4, 7, 2];
console.log(findNumberOfLIS(nums));
