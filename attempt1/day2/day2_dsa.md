# 💻 DSA Interview Notes

## Remove Duplicates & Container With Most Water

---

# 🧠 1. Remove Duplicates

## 📌 Problem Statement

Given an array, remove duplicate values and return a new array with only unique elements.

---

## 📥 Input

```js
[1, 2, 2, 3, 4, 4, 5]
```

## 📤 Output

```js
[1, 2, 3, 4, 5]
```

---

## 💡 Approach 1: Using Set (Best & Clean)

### 🧠 Idea

A Set automatically stores only unique values.

### 🪜 Steps

1. Convert array to Set
2. Convert Set back to array

### 💻 Code

```js
const arr = [1, 2, 2, 3, 4, 4, 5];

const uniqueSet = new Set(arr);
const result = [...uniqueSet];

console.log(result);
```

### ⏱ Complexity

* Time: O(n)
* Space: O(n)

---

## 💡 Approach 2: Using Hash Map (Interview Preferred)

### 🧠 Idea

Track already seen elements using an object.

### 💻 Code

```js
function removeDuplicates(arr) {
  const seen = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!seen[arr[i]]) {
      seen[arr[i]] = true;
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(removeDuplicates([1,2,2,3,4,4,5]));
```

---

## 💡 Approach 3: Two Pointers (Sorted Array)

### 🧠 Idea

Overwrite duplicates in-place using two pointers.

### 💻 Code

```js
function removeDuplicates(nums) {
  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
}
```

---

## 🎯 Key Takeaway

* Use Set for simplicity
* Use HashMap for interviews
* Use Two Pointers for sorted arrays

---

# 🌊 2. Container With Most Water

## 📌 Problem Statement

Given an array of heights, find two lines that form a container that holds the maximum water.

---

## 📥 Input

```js
[1,8,6,2,5,4,8,3,7]
```

## 📤 Output

```js
49
```

---

## 🧠 Key Formula

Area = width × height

```
width = right - left
height = min(height[left], height[right])
```

---

## 💡 Optimal Approach: Two Pointers

### 🧠 Idea

Start from both ends and move the smaller height inward.

---

## 🪜 Steps

1. Set left = 0, right = n-1
2. Calculate area
3. Update max area
4. Move smaller height pointer

---

## 💻 Code

```js
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    let width = right - left;
    let h = Math.min(height[left], height[right]);
    let area = width * h;

    max = Math.max(max, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
```

---

## 🔍 Why Move Smaller Pointer?

Because area is limited by the smaller height.
Moving the larger one won’t help increase area.

---

## ⏱ Complexity

* Time: O(n)
* Space: O(1)

---

# 🎯 Final Interview Tips

### Remove Duplicates

* Set → easiest
* HashMap → interview standard
* Two pointers → advanced

### Container With Most Water

* Always use two pointers
* Move smaller height pointer

---

💡 Master these two patterns:

* Hashing (frequency / uniqueness)
* Two pointers (optimization problems)
