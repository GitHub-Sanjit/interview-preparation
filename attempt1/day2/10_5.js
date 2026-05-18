// Two Sum II (Sorted Array)
// [2,7,11,15], target = 9

// function twoSum(arr, target) {
//   const map = new Map();
//   for (let i = 0; i < arr.length; i++) {
//     let complement = target - arr[i];
//     if (map.has(complement)) {
//       return [map.get(complement) + 1, i + 1];
//     }
//     map.set(arr[i], i);
//   }
// }

function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement) + 1, i + 1];
    }
    map.set(arr[i], i);
  }
}

console.log(twoSum([2, 3, 4], 6));
