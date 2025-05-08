// You are given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
// A subarray is a contiguous non-empty sequence of elements within an array.

// 1. brute-force, use 2 for loop to iterate all the possible subarray sum
// 2. prefix sum + map, check the count of prefixSum - k

class Solution {
  subArraySum(nums, k) {
    let prefixSumCount = new Map();
    prefixSumCount.set(0, 1);

    let sum = 0;
    let count = 0;

    for (let num of nums) {
      sum += num;
      let diff = sum - k;
      if (prefixSumCount.has(diff)) {
        count += prefixSumCount.get(diff);
      }
      if (!prefixSumCount.has(sum)) {
        prefixSumCount.set(sum, 1);
      } else {
        prefixSumCount.set(sum, prefixSumCount.get(sum) + 1);
      }
    }

    return count;
  }
}

let nums = [2, -1, 1, 2];

let solution = new Solution();
console.log(solution.subArraySum(nums, 2)); // 4
