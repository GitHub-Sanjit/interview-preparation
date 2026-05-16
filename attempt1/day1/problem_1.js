// function twoSum(nums, target) {
//   const map = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];

//     if (map.has(complement)) {
//       return [map.get(complement), i];
//     }

//     map.set(nums[i], i);
//   }
// }

function twoSum(nums, target) {
  // create an empty map
  const map = new Map();

  // loop through the numbers array
  for (let i = 0; i < nums.length; i++) {
    // find out the complement
    let complement = target - nums[i];
    // if there map have the complement then return the complement indices and the current indicies
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    // otherwise set the complement in the map with it's indicies
    map.set(nums[i], i);
  }
}

const result = twoSum([3, 2, 4], 6);
console.log(result);
