# 🧠 Beginner DSA Problems (JavaScript) — Step-by-Step Practice Sheet

This guide contains **10 beginner-friendly DSA problems** arranged in the correct learning order.

Each problem includes:

* Problem idea
* Pattern
* Solution approach
* Code

---

# 1. 🔁 Two Sum (Hash Map Basics)

## 📌 Problem

Find two numbers that add up to a target.

## 🧠 Pattern

Hash Map (Lookup optimization)

## 💡 Idea

Store numbers as you iterate and check complement.

## 💻 Solution

```js
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
}
```

---

# 2. 🔤 Valid Anagram

## 📌 Problem

Check if two strings are anagrams.

## 🧠 Pattern

Frequency Count (Hash Map)

## 💻 Solution

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = new Map();

  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let char of t) {
    if (!map.has(char)) return false;

    map.set(char, map.get(char) - 1);

    if (map.get(char) < 0) return false;
  }

  return true;
}
```

---

# 3. 🔁 Contains Duplicate

## 📌 Problem

Check if array contains duplicate values.

## 🧠 Pattern

Set (Uniqueness check)

## 💻 Solution

```js
function containsDuplicate(nums) {
  const set = new Set();

  for (let num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }

  return false;
}
```

---

# 4. 📊 Maximum Number in Array

## 📌 Problem

Find largest number in array.

## 🧠 Pattern

Linear Scan

## 💻 Solution

```js
function findMax(nums) {
  let max = nums[0];

  for (let num of nums) {
    if (num > max) {
      max = num;
    }
  }

  return max;
}
```

---

# 5. ➕ Sum of Array

## 📌 Problem

Find sum of all elements.

## 🧠 Pattern

Accumulation

## 💻 Solution

```js
function sumArray(nums) {
  let sum = 0;

  for (let num of nums) {
    sum += num;
  }

  return sum;
}
```

---

# 6. 🔄 Reverse a String

## 📌 Problem

Reverse a given string.

## 🧠 Pattern

Two pointers / iteration

## 💻 Solution

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}
```

---

# 7. 🔢 Fizz Buzz

## 📌 Problem

Print numbers with rules:

* multiple of 3 → Fizz
* multiple of 5 → Buzz

## 🧠 Pattern

Conditionals

## 💻 Solution

```js
function fizzBuzz(n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }

  return result;
}
```

---

# 8. 🔍 Find First Unique Character

## 📌 Problem

Find first non-repeating character.

## 🧠 Pattern

Frequency Map

## 💻 Solution

```js
function firstUniqueChar(s) {
  const map = new Map();

  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) return i;
  }

  return -1;
}
```

---

# 9. 📦 Move Zeroes

## 📌 Problem

Move all zeros to end of array.

## 🧠 Pattern

Two pointers

## 💻 Solution

```js
function moveZeroes(nums) {
  let index = 0;

  for (let num of nums) {
    if (num !== 0) {
      nums[index] = num;
      index++;
    }
  }

  while (index < nums.length) {
    nums[index] = 0;
    index++;
  }

  return nums;
}
```

---

# 10. 🔁 Palindrome Check

## 📌 Problem

Check if string reads same forward and backward.

## 🧠 Pattern

Two pointers

## 💻 Solution

```js
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }

  return true;
}
```

---

# 🚀 How to Practice These Properly

For each problem:

### Step 1: Try brute force

### Step 2: Identify pattern

### Step 3: Write optimized solution

### Step 4: Explain out loud like interview

---

# 🧠 Final Goal

If you can recognize these patterns:

* Hash Map → Two Sum, Anagram
* Set → Duplicate
* Two pointers → Palindrome, Move Zeroes

👉 You are already interview-ready for basics.
