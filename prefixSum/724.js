var pivotIndex = function (nums) {
  let size = nums.length;
  let leftPrefix = new Array(size).fill(0);
  let rightPrefix = new Array(size).fill(0);

  let total = 0;
  for (let i = 0; i < size; i++) {
    leftPrefix[i] = total;
    total += nums[i];
  }

  total = 0;
  for (let i = size - 1; i >= 0; i--) {
    rightPrefix[i] = total;
    total += nums[i];
  }

  for (let i = 0; i < size; i++) {
    if (leftPrefix[i] === rightPrefix[i]) {
      return i;
    }
  }

  return -1;
};
