// function maxSum(nums, k) {
//   let sum = 0, max = 0, start = 0;  // 👈 added start pointer

//   for (let i = 0; i < nums.length; i++) {
//     sum += nums[i];

//     if (i >= k - 1) {
//       max = Math.max(max, sum);
//       sum -= nums[start];   // remove the leftmost element
//       start++;              // move window start forward
//     }
//   }

//   return max;
// }

function maxSum(nums, k) {
  let sum = 0;
  let max = 0;
  let firstPosition = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (i >= k - 1) {
      max = Math.max(max, sum);
      sum -= nums[firstPosition];
      firstPosition++;
    }
  }
  return max;
}

console.log(maxSum([1, 4, 2, 9, 5], 3));
