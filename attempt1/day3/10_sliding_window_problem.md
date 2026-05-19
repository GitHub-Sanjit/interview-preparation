# 💻 Sliding Window — 10 Curated Problems (Easy → Hard)

This set is designed to **build intuition step-by-step**. Don’t just read—try each before checking the solution.

---

## 🟢 1. Maximum Sum Subarray of Size K (Easy)

### 📥 Input

```js
nums = [2,1,5,1,3,2], k = 3
```

### 📤 Output

```
9
```

### 💻 Code

```js
function maxSum(nums, k) {
  let sum = 0, max = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (i >= k - 1) {
      max = Math.max(max, sum);
      sum -= nums[i - k + 1];
    }
  }

  return max;
}
```

### 💡 Explanation

Window of size 3 slides → [2,1,5]=8, [1,5,1]=7, [5,1,3]=9 → max = 9

---

## 🟢 2. Average of Subarrays of Size K

### 📥 Input

```js
nums = [1,3,2,6,-1,4,1,8,2], k = 5
```

### 📤 Output

```
[2.2, 2.8, 2.4, 3.6, 2.8]
```

### 💻 Code

```js
function avgSubarrays(nums, k) {
  let sum = 0, res = [];

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (i >= k - 1) {
      res.push(sum / k);
      sum -= nums[i - k + 1];
    }
  }

  return res;
}
```

---

## 🟡 3. Longest Substring Without Repeating Characters

### 📥 Input

```js
s = "abcabcbb"
```

### 📤 Output

```
3
```

### 💻 Code

```js
function longestUnique(s) {
  let set = new Set();
  let left = 0, max = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }

    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }

  return max;
}
```

---

## 🟡 4. Smallest Subarray with Sum ≥ S

### 📥 Input

```js
nums = [2,1,5,2,3,2], S = 7
```

### 📤 Output

```
2
```

### 💻 Code

```js
function minSubArrayLen(nums, S) {
  let left = 0, sum = 0, minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= S) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left++];
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

---

## 🟡 5. Fruits into Baskets (At most 2 types)

### 📥 Input

```js
fruits = [1,2,1]
```

### 📤 Output

```
3
```

### 💻 Code

```js
function totalFruit(arr) {
  let map = new Map();
  let left = 0, max = 0;

  for (let right = 0; right < arr.length; right++) {
    map.set(arr[right], (map.get(arr[right]) || 0) + 1);

    while (map.size > 2) {
      map.set(arr[left], map.get(arr[left]) - 1);
      if (map.get(arr[left]) === 0) map.delete(arr[left]);
      left++;
    }

    max = Math.max(max, right - left + 1);
  }

  return max;
}
```

---

## 🟠 6. Longest Repeating Character Replacement

### 📥 Input

```js
s = "AABABBA", k = 1
```

### 📤 Output

```
4
```

### 💻 Code

```js
function charReplace(s, k) {
  let map = {}, left = 0, maxCount = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    map[s[right]] = (map[s[right]] || 0) + 1;
    maxCount = Math.max(maxCount, map[s[right]]);

    while ((right - left + 1) - maxCount > k) {
      map[s[left]]--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## 🟠 7. Permutation in String

### 📥 Input

```js
s1 = "ab", s2 = "eidbaooo"
```

### 📤 Output

```
true
```

### 💻 Code

```js
function checkInclusion(s1, s2) {
  let need = {}, window = {};

  for (let c of s1) need[c] = (need[c] || 0) + 1;

  let left = 0, match = 0;

  for (let right = 0; right < s2.length; right++) {
    let c = s2[right];
    window[c] = (window[c] || 0) + 1;

    if (window[c] === need[c]) match++;

    while (right - left + 1 > s1.length) {
      let leftChar = s2[left++];
      if (window[leftChar] === need[leftChar]) match--;
      window[leftChar]--;
    }

    if (match === Object.keys(need).length) return true;
  }

  return false;
}
```

---

## 🔴 8. Subarrays with Sum = K

### 📥 Input

```js
nums = [1,1,1], k = 2
```

### 📤 Output

```
2
```

### 💻 Code

```js
function subarraySum(nums, k) {
  let map = new Map();
  map.set(0, 1);

  let sum = 0, count = 0;

  for (let num of nums) {
    sum += num;

    if (map.has(sum - k)) {
      count += map.get(sum - k);
    }

    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}
```

---

## 🔴 9. Minimum Window Substring

### 📥 Input

```js
s = "ADOBECODEBANC", t = "ABC"
```

### 📤 Output

```
"BANC"
```

### 💻 Code

```js
function minWindow(s, t) {
  let map = {};
  for (let c of t) map[c] = (map[c] || 0) + 1;

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

## 🔴 10. Sliding Window Maximum (Hard)

### 📥 Input

```js
nums = [1,3,-1,-3,5,3,6,7], k = 3
```

### 📤 Output

```
[3,3,5,5,6,7]
```

### 💻 Code

```js
function maxSlidingWindow(nums, k) {
  let deque = [], result = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] <= i - k) deque.shift();

    while (deque.length && nums[deque.at(-1)] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) result.push(nums[deque[0]]);
  }

  return result;
}
```

---

## 🎯 Final Advice

* Start from Problem 1 → don’t skip ahead
* Focus on **why window expands/shrinks**
* Trace with pen & paper

If you can solve 7–10 confidently, you are interview-ready for this pattern 🚀
