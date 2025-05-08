function closeDuplicatesBruteForce(nums, k) {
  for (let L = 0; L < nums.length; L++) {
    for (let R = L + 1; R < Math.min(nums.length, L + k); R++) {
      if (nums[L] === nums[R]) {
        return true;
      }
    }
  }

  return false;
}

function closeDuplicates(nums, k) {
  let window = new Set();
  let L = 0;

  for (let R = 0; R < nums.length; R++) {
    if (R - L > k) {
      window.delete(nums[L]);
      L++;
    }
    if (window.has(nums[R])) {
      return true;
    }
    window.add(nums[R]);
  }
  return false;
}
