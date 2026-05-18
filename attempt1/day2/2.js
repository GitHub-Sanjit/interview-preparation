const arr = [1, 2, 2, 3, 4, 4, 5];

function uniqueArray(arr) {
  const obj = {};
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

console.log(uniqueArray(arr));
