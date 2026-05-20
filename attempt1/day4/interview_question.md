# 🎯 DAY 4 — Interview Questions (Arrays & Objects)

These are **real interview-style questions** based on today’s topics. Each one is explained deeply with code, reasoning, and edge cases.

---

# 🔹 1. What is the difference between `map()` and `forEach()`?

## ✅ Short Answer

* `map()` returns a **new array**
* `forEach()` returns **undefined**

---

## 💻 Example

```js
const nums = [1, 2, 3];

// map
const result = nums.map(n => n * 2);
console.log(result); // [2, 4, 6]

// forEach
const output = nums.forEach(n => n * 2);
console.log(output); // undefined
```

---

## 🧠 Deeper Insight

### ❌ Wrong usage of forEach

```js
const result = [];

nums.forEach(n => {
  result.push(n * 2);
});
```

👉 This works, but it's **not optimal**

---

### ✅ Correct approach

```js
const result = nums.map(n => n * 2);
```

---

## 🎯 Interview Tip

Use:

* `map()` → when you want a **new transformed array**
* `forEach()` → when doing **side effects** (logging, API calls)

---

# 🔹 2. When should you use `reduce()` instead of `map()` or `filter()`?

## ✅ Concept

Use `reduce()` when:

* You need a **single output**
* You are **aggregating data**

---

## 💻 Example 1: Sum

```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 10
```

---

## 💻 Example 2: Convert array to object

```js
const users = [
  { id: 1, name: "Sanjit" },
  { id: 2, name: "Rahim" }
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

console.log(userMap);
/*
{
  1: { id: 1, name: "Sanjit" },
  2: { id: 2, name: "Rahim" }
}
*/
```

---

## 🧠 Key Insight

Anything you can do with `map` or `filter` can technically be done with `reduce`, but:

👉 Don’t overuse it — readability matters.

---

# 🔹 3. What is a shallow copy vs deep copy?

## ✅ Shallow Copy

Copies only the **top level**, nested objects are shared.

---

## 💻 Example

```js
const original = {
  name: "Sanjit",
  address: { city: "Dhaka" }
};

const copy = { ...original };

copy.address.city = "Jessore";

console.log(original.address.city); // Jessore ❗
```

---

## ✅ Deep Copy

Creates a **completely independent copy**

---

## 💻 Example

```js
const original = {
  name: "Sanjit",
  address: { city: "Dhaka" }
};

const deepCopy = structuredClone(original);

deepCopy.address.city = "Jessore";

console.log(original.address.city); // Dhaka ✅
```

---

## ⚠️ Interview Trap

```js
const copy = original;
```

👉 This is **NOT a copy**, it's just a reference.

---

# 🔹 4. What is immutability and why is it important?

## ✅ Definition

Immutability means:

> Never modify original data, always create a new copy.

---

## ❌ Mutable Example

```js
const arr = [1, 2, 3];
arr.push(4);
```

---

## ✅ Immutable Example

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4];
```

---

## 💻 Object Example

```js
const user = { name: "Sanjit" };

const updated = { ...user, age: 22 };
```

---

## 🧠 Why It Matters

* Predictable state
* Easier debugging
* Crucial for React (state updates)

---

## 🎯 Interview Tip

If you mutate data in React:

👉 UI may **not re-render correctly**

---

# 🔹 5. Can you chain `map`, `filter`, and `reduce`?

## ✅ Yes (very common in interviews)

---

## 💻 Example

```js
const numbers = [1, 2, 3, 4, 5];

// Double → keep even → sum
const result = numbers
  .map(n => n * 2)        // [2,4,6,8,10]
  .filter(n => n % 2 === 0)
  .reduce((acc, n) => acc + n, 0);

console.log(result); // 30
```

---

## 🧠 Insight

Chaining creates:

* Cleaner code
* Functional style
* Less mutation

---

# 🔹 6. How does `reduce()` work internally?

## 💡 Concept

It loops through array and carries a value called **accumulator**

---

## 💻 Step-by-step Example

```js
const nums = [1, 2, 3];

const result = nums.reduce((acc, curr) => {
  console.log(`acc: ${acc}, curr: ${curr}`);
  return acc + curr;
}, 0);
```

---

## 🔍 Execution Flow

```
Step 1: acc=0, curr=1 → 1
Step 2: acc=1, curr=2 → 3
Step 3: acc=3, curr=3 → 6
```

---

## 🧠 Final Output

```js
console.log(result); // 6
```

---

# 🔹 7. How to remove duplicates from an array?

## 💻 Using Set

```js
const nums = [1, 2, 2, 3, 4, 4];

const unique = [...new Set(nums)];

console.log(unique); // [1,2,3,4]
```

---

## 💻 Using reduce

```js
const nums = [1, 2, 2, 3];

const unique = nums.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);

console.log(unique); // [1,2,3]
```

---

## 🎯 Interview Insight

* `Set` is faster and cleaner
* `reduce` shows deeper understanding

---

# 🔹 8. How to flatten an array?

## 💻 Using flat()

```js
const arr = [1, [2, [3, 4]]];

console.log(arr.flat(2)); // [1,2,3,4]
```

---

## 💻 Using reduce

```js
const arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}

console.log(flatten(arr)); // [1,2,3,4]
```

---

# 🔹 9. What happens if you don’t return in `map()`?

## 💻 Example

```js
const nums = [1, 2, 3];

const result = nums.map(n => {
  n * 2;
});

console.log(result); // [undefined, undefined, undefined]
```

---

## ✅ Fix

```js
const result = nums.map(n => n * 2);
```

---

## 🧠 Insight

`map()` **must return a value**

---

# 🔹 10. How to count occurrences in an array?

## 💻 Example

```js
const fruits = ["apple", "banana", "apple"];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(count);
// { apple: 2, banana: 1 }
```

---

## 🎯 Interview Insight

This pattern is **very frequently asked**

---

# 🚀 Final Advice for Interviews

* Prefer **clean code over clever code**
* Use `map`, `filter` when possible instead of loops
* Explain your thinking out loud
* Mention **time complexity** when relevant

---
