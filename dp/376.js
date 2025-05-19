/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  let n = nums.length;
  let dpUp = new Array(n).fill(1);
  let dpDown = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dpUp[i] = Math.max(dpUp[i], dpDown[j] + 1);
      } else if (nums[i] < nums[j]) {
        dpDown[i] = Math.max(dpDown[i], dpUp[j] + 1);
      }
    }
  }

  return Math.max(dpUp[n - 1], dpDown[n - 1]);
};

// or just counting the fking peaks and valleys
function wiggleMaxLengthOptimized(nums) {
  let n = nums.length;
  let peak = 1;
  let valley = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      peak = valley + 1;
    } else if (nums[i] < nums[i - 1]) {
      valley = peak + 1;
    }
  }

  return Math.max(peak, valley);
}

let testCases = [
  [1, 17, 5, 10, 13, 15, 10, 5, 16, 8],
  [1, 7, 4, 9, 2, 5],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];
for (let i = 0; i < testCases.length; i++) {
  console.log(wiggleMaxLengthOptimized(testCases[i]));
}
