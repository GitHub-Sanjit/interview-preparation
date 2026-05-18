// Every element appears twice except one.
// [4, 1, 2, 1, 2, 4]

function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}

console.log(singleNumber([4, 1, 2, 1, 2, 4, 9]));
