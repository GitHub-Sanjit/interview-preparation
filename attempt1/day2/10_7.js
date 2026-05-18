function moveZeros(nums) {
  let pos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[pos]] = [nums[pos], nums[i]];
      pos++;
    }
  }
  return nums;
}

console.log(moveZeros([0,1,0,3,12]))