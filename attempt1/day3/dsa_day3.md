# 💻 DSA — Sliding Window (Complete Guide)

Sliding Window is one of the most important patterns in Data Structures & Algorithms, especially for **arrays and strings**.

It helps reduce time complexity from **O(n²) → O(n)** by avoiding unnecessary repeated work.

---

## 🧠 1. What is Sliding Window?

Instead of recalculating values for every subarray, we maintain a **window (range)** and slide it across the array.

### 📌 Idea

* Use two pointers: `left` and `right`
* Expand window → move `right`
* Shrink window → move `left`

---

## 🧩 2. Types of Sliding Window

### ✅ Fixed Size Window

* Window size is constant (e.g., size = k)

### ✅ Variable Size Window

* Window expands/shrinks based on condition

---

## 📦 3. Fixed Window Example

### 🔍 Problem

Find maximum sum of subarray of size `k`

### 💻 Code

```js
function maxSumSubarray(nums, k) {
  let windowSum = 0;
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];

    // When window size reaches k
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);

      // Remove left element
      windowSum -= nums[i - k + 1];
    }
  }

  return maxSum;
}
```

### 💡 Explanation

* Add current element
* Once window hits size `k`, calculate result
* Remove leftmost element before moving forward

---

## 🔄 4. Variable Window Example

### 🔍 Problem

Longest substring without repeating characters

### 💻 Code

```js
function lengthOfLongestSubstring(s) {
  let set = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

### 💡 Explanation

* Expand `right`
* If duplicate → shrink from `left`
* Track max window size

---

## 🔥 5. Classic Problems You Must Know

### 1. Maximum Sum Subarray of Size K

```js
maxSumSubarray([2,1,5,1,3,2], 3) // 9
```

---

### 2. Longest Substring Without Repeating Characters

```js
lengthOfLongestSubstring("abcabcbb") // 3
```

---

### 3. Minimum Window Substring (Hard)

### 🔍 Problem

Find smallest substring containing all characters of another string

### 💻 Code

```js
function minWindow(s, t) {
  let map = {};

  for (let char of t) {
    map[char] = (map[char] || 0) + 1;
  }

  let left = 0, count = t.length;
  let minLen = Infinity, start = 0;

  for (let right = 0; right < s.length; right++) {
    if (map[s[right]] > 0) count--;
    map[s[right]]--;

    while (count === 0) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }

      map[s[left]]++;
      if (map[s[left]] > 0) count++;
      left++;
    }
  }

  return minLen === Infinity ? "" : s.slice(start, start + minLen);
}
```

---

## 🧠 6. Pattern Recognition (VERY IMPORTANT)

When to use Sliding Window?

Look for keywords:

* "subarray"
* "substring"
* "contiguous"
* "longest / shortest"
* "maximum / minimum"

---

## ⚡ 7. General Template

### Fixed Window

```js
for (let i = 0; i < n; i++) {
  // add element

  if (window size == k) {
    // calculate answer

    // remove left element
  }
}
```

---

### Variable Window

```js
while (right < n) {
  // expand window

  while (condition breaks) {
    // shrink window
  }

  // update result
  right++;
}
```

---

## 🎯 8. Common Mistakes

❌ Forgetting to shrink window
❌ Wrong condition for shrinking
❌ Not updating result at correct time
❌ Off-by-one errors (`right - left + 1`)

---

## 🧪 9. Practice Problems

1. Maximum average subarray
2. Longest repeating character replacement
3. Permutation in string
4. Subarrays with sum = k

---

## 🔚 Final Thought

Sliding Window is not about memorizing problems.

It’s about recognizing:
👉 "Can I reuse previous computation instead of recalculating?"

Once you master this mindset, many problems become easy.
