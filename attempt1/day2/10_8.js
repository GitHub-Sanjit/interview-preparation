function removeElement(nums, val) {
  let k = 0;
  for (let num of nums) {
    if (num !== val) {
      nums[k] = num;
      k++;
    }
  }
  return k;
}

// [3, 2, 2, 3]
// val = 3
console.log(removeElement([3, 2, 2, 3], 3));
