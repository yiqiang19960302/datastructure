function permutationRecursive(nums) {
  return helper(0, nums);
}

function helper(i, nums) {
  if (i === nums.length) {
    return [[]];
  }
  let resPerms = [];
  let perms = helper(i + 1, nums);

  for (let p of perms) {
    for (let j = 0; j < p.length + 1; j++) {
      let pCopy = Array.from(p);
      pCopy.splice(j, 0, nums[i]);
      resPerms.push(pCopy);
    }
  }

  return resPerms;
}

function permutationsIterative(nums) {
  let perms = new Array();
  perms.push(new Array());

  for (let n of nums) {
    let nextPerms = new Array();
    for (let p of perms) {
      for (let i = 0; i < p.length + 1; i++) {
        let pCopy = Array.from(p);
        pCopy.splice(i, 0, n);
        nextPerms.push(pCopy);
      }
    }
    perms = nextPerms;
  }

  return perms;
}
