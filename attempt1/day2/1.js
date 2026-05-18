// 1. Remove Duplicates
//* Given an array, remove duplicate values and return a new array with only unique elements.

const arr = [1, 2, 2, 3, 4, 4, 5];

const set = new Set(arr);
// console.log(set)
const newArr = [...set];
console.log(newArr)
