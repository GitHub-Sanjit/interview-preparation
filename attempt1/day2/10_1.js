// Check if any value appears more than once.

function containDuplicate(nums) {
  const set = new Set();

  for (let num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}

console.log(containDuplicate([1, 2, 3]));
