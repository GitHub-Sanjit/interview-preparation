# 💻 DSA Pattern Practice (Top 10 Problems)

## 🧠 Core Patterns Covered

* 🔁 Hashing / Frequency Map
* 🪟 Two Pointers
* 📊 Sliding Window
* ⚡ Greedy Thinking

---

# 🔁 A. Hashing / Frequency Map Pattern

## 1. Contains Duplicate

### 📌 Problem

Check if any value appears more than once.

### 📥 Input

```js
[1, 2, 3, 1]
```

### 📤 Output

```js
true
```

### 💡 Idea

Use a Set to track seen values.

### 💻 Code

```js
function containsDuplicate(nums) {
  const seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
```

---

## 2. Single Number

### 📌 Problem

Every element appears twice except one.

### 📥 Input

```js
[4, 1, 2, 1, 2]
```

### 📤 Output

```js
4
```

### 💡 Idea

Use XOR to cancel duplicates.

### 💻 Code

```js
function singleNumber(nums) {
  let result = 0;

  for (let num of nums) {
    result ^= num;
  }

  return result;
}
```

---

## 3. Intersection of Two Arrays

### 📌 Problem

Find common elements between two arrays.

### 📥 Input

```js
[1,2,2,1], [2,2]
```

### 📤 Output

```js
[2]
```

### 💡 Idea

Use Set for fast lookup.

### 💻 Code

```js
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();

  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }

  return [...result];
}
```

---

## 4. First Unique Character in String

### 📌 Problem

Find first non-repeating character index.

### 📥 Input

```js
"leetcode"
```

### 📤 Output

```js
0
```

### 💡 Idea

Use frequency map.

### 💻 Code

```js
function firstUniqChar(s) {
  const freq = {};

  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) return i;
  }

  return -1;
}
```

---

# 🪟 B. Two Pointers Pattern

## 5. Two Sum II (Sorted Array)

### 📌 Problem

Find two numbers that sum to target.

### 📥 Input

```js
[2,7,11,15], target = 9
```

### 📤 Output

```js
[1,2]
```

### 💡 Idea

Use left and right pointers.

### 💻 Code

```js
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) return [left + 1, right + 1];

    if (sum < target) left++;
    else right--;
  }
}
```

---

## 6. Valid Palindrome

### 📌 Problem

Check if string is palindrome.

### 📥 Input

```js
"racecar"
```

### 📤 Output

```js
true
```

### 💡 Idea

Compare from both ends.

### 💻 Code

```js
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

---

## 7. Move Zeroes

### 📌 Problem

Move all zeros to end.

### 📥 Input

```js
[0,1,0,3,12]
```

### 📤 Output

```js
[1,3,12,0,0]
```

### 💡 Idea

Overwrite non-zero values.

### 💻 Code

```js
function moveZeroes(nums) {
  let insertPos = 0;

  for (let num of nums) {
    if (num !== 0) {
      nums[insertPos++] = num;
    }
  }

  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }

  return nums;
}
```

---

## 8. Remove Element

### 📌 Problem

Remove all occurrences of a value.

### 📥 Input

```js
nums = [3,2,2,3], val = 3
```

### 📤 Output

```js
[2,2]
```

### 💡 Idea

Overwrite using pointer.

### 💻 Code

```js
function removeElement(nums, val) {
  let k = 0;

  for (let num of nums) {
    if (num !== val) {
      nums[k++] = num;
    }
  }

  return k;
}
```

---

# 📊 C. Sliding Window Pattern

## 9. Maximum Subarray Sum (Kadane’s / Window idea)

### 📌 Problem

Find max sum of contiguous subarray.

### 📥 Input

```js
[-2,1,-3,4,-1,2,1,-5,4]
```

### 📤 Output

```js
6
```

### 💡 Idea

Expand window, reset when negative.

### 💻 Code

```js
function maxSubArray(nums) {
  let max = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }

  return max;
}
```

---

# ⚡ D. Greedy Pattern

## 10. Best Time to Buy and Sell Stock

### 📌 Problem

Maximize profit with one transaction.

### 📥 Input

```js
[7,1,5,3,6,4]
```

### 📤 Output

```js
5
```

### 💡 Idea

Track minimum price and max profit.

### 💻 Code

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}
```

---

# 🚀 Final Insight

## 🧠 Pattern Recognition is the Key

* 🔁 Hashing → uniqueness / frequency
* 🪟 Two Pointers → optimization on arrays
* 📊 Sliding Window → subarray problems
* ⚡ Greedy → local best choice

---

💡 If you master these 10 problems, you can solve 70% of array-based interview questions.
