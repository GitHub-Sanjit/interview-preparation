// Find common elements between two arrays.
// [1,2,2,1,4,6,8], [2,2,4,6]

function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set();
  for (let num of nums2) {
    if (set1.has(num)) set2.add(num);
  }
  return [...set2];
}

console.log(intersection([1,2,2,1,4,6,8], [2,2,4,6]));
