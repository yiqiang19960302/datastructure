function longestSubarray(nums) {
  let length = 0;
  let L = 0;

  for (let R = 0; R < nums.length; R++) {
    if (nums[L] !== nums[R]) {
      L = R;
    }

    length = Math.max(length, R - L + 1);
  }
  return length;
}
