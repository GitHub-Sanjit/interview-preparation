# 📅 DAY 4 — Arrays & Objects

Welcome to Day 4. Today you're stepping into some of the most *important* JavaScript concepts that directly affect how you write clean, predictable, and scalable code.

We’ll go deep into:

* `map`, `filter`, `reduce`
* Deep vs Shallow Copy
* `map` vs `forEach`
* Immutability

---

# 🔹 1. `map()` — Transforming Data

## 📌 What it does

`map()` creates a **new array** by applying a function to every element of the original array.

👉 It **does NOT modify** the original array.

---

## 💻 Syntax

```js
array.map((element, index, array) => {
  return newElement;
});
```

---

## 📥 Example

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (unchanged)
```

---

## 🧠 Key Idea

Use `map()` when you want to **transform data**.

---

## 📦 Real-world Example

```js
const users = [
  { name: "Sanjit", age: 22 },
  { name: "Rahim", age: 25 }
];

const names = users.map(user => user.name);

console.log(names); // ["Sanjit", "Rahim"]
```

---

# 🔹 2. `filter()` — Selecting Data

## 📌 What it does

`filter()` creates a new array with only elements that pass a condition.

---

## 💻 Syntax

```js
array.filter((element) => {
  return condition;
});
```

---

## 📥 Example

```js
const numbers = [1, 2, 3, 4, 5];

const evens = numbers.filter(num => num % 2 === 0);

console.log(evens); // [2, 4]
```

---

## 🧠 Key Idea

Use `filter()` when you want to **keep some elements and discard others**.

---

## 📦 Real-world Example

```js
const users = [
  { name: "Sanjit", active: true },
  { name: "Karim", active: false }
];

const activeUsers = users.filter(user => user.active);

console.log(activeUsers);
// [{ name: "Sanjit", active: true }]
```

---

# 🔹 3. `reduce()` — Reducing to One Value

## 📌 What it does

`reduce()` takes an array and reduces it to a **single value** (number, object, array, etc.)

---

## 💻 Syntax

```js
array.reduce((accumulator, currentValue) => {
  return updatedAccumulator;
}, initialValue);
```

---

## 📥 Example: Sum

```js
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // 10
```

---

## 📦 Example: Count occurrences

```js
const fruits = ["apple", "banana", "apple", "orange"];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(count);
// { apple: 2, banana: 1, orange: 1 }
```

---

## 🧠 Key Idea

Use `reduce()` when you want to:

* Sum values
* Build objects
* Aggregate data

---

# 🔹 4. Deep vs Shallow Copy

## 📌 Shallow Copy

A shallow copy copies only the **first level**. Nested objects are still referenced.

---

## 💻 Example

```js
const original = {
  name: "Sanjit",
  address: { city: "Dhaka" }
};

const shallowCopy = { ...original };

shallowCopy.address.city = "Jessore";

console.log(original.address.city); // "Jessore" ❗ (changed!)
```

---

## 📌 Deep Copy

A deep copy duplicates **everything**, including nested objects.

---

## 💻 Example

```js
const original = {
  name: "Sanjit",
  address: { city: "Dhaka" }
};

const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = "Jessore";

console.log(original.address.city); // "Dhaka" ✅ (unchanged)
```

---

## ⚠️ Note

`JSON.parse(JSON.stringify())` has limitations:

* Doesn’t copy functions
* Doesn’t handle `undefined`, `Date`, `Map`, etc.

👉 Modern alternative:

```js
const deepCopy = structuredClone(original);
```

---

# 🔹 5. `map()` vs `forEach()`

## 🧠 Core Difference

| Feature      | map()           | forEach()     |
| ------------ | --------------- | ------------- |
| Return value | New array ✅     | Undefined ❌   |
| Mutability   | Immutable style | Often mutates |
| Use case     | Transform data  | Side effects  |

---

## 💻 Example

### map()

```js
const nums = [1, 2, 3];

const result = nums.map(n => n * 2);

console.log(result); // [2, 4, 6]
```

---

### forEach()

```js
const nums = [1, 2, 3];

nums.forEach(n => {
  console.log(n * 2);
});

// No return value
```

---

## ❗ Important Insight

If you find yourself doing this:

```js
const result = [];

nums.forEach(n => {
  result.push(n * 2);
});
```

👉 You should use `map()` instead.

---

# 🔹 6. Immutability

## 📌 What is Immutability?

Immutability means **not changing the original data**, but instead creating new copies.

---

## ❌ Mutable Example

```js
const arr = [1, 2, 3];

arr.push(4);

console.log(arr); // [1, 2, 3, 4]
```

---

## ✅ Immutable Example

```js
const arr = [1, 2, 3];

const newArr = [...arr, 4];

console.log(newArr); // [1, 2, 3, 4]
console.log(arr);    // [1, 2, 3]
```

---

## 📦 Object Example

```js
const user = { name: "Sanjit" };

const updatedUser = { ...user, age: 22 };

console.log(user);        // { name: "Sanjit" }
console.log(updatedUser); // { name: "Sanjit", age: 22 }
```

---

## 🧠 Why Immutability Matters

* Predictable behavior
* Easier debugging
* Essential for frameworks like React
* Avoids unintended side effects

---

# 🚀 Final Summary

* `map()` → transform data
* `filter()` → select data
* `reduce()` → combine data
* Shallow copy → reference nested objects
* Deep copy → fully independent copy
* `map` vs `forEach` → transformation vs side effects
* Immutability → never modify original data

---

# 🧪 Practice Challenge

Try solving:

```js
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Tablet", price: 700 }
];

// 1. Get all product names
// 2. Get products above 600
// 3. Get total price using reduce
```

---

# 📦 Arrays Practice Solution — Products Example

## ✅ Given Data

```js
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Tablet", price: 700 }
];
```

---

# 🔹 1. Get all product names

## 💡 Approach

We need to **transform** each object into just its `name`.

👉 Use `map()`

## 💻 Code

```js
const productNames = products.map(product => product.name);

console.log(productNames);
// ["Laptop", "Phone", "Tablet"]
```

## 🧠 Explanation

* `map()` loops through each item
* Returns a **new array**
* Extracts only the `name` property

---

# 🔹 2. Get products above 600

## 💡 Approach

We need to **filter** products based on a condition.

👉 Use `filter()`

## 💻 Code

```js
const expensiveProducts = products.filter(product => product.price > 600);

console.log(expensiveProducts);
/*
[
  { name: "Laptop", price: 1000 },
  { name: "Tablet", price: 700 }
]
*/
```

## 🧠 Explanation

* `filter()` keeps only elements that satisfy the condition
* Condition: `price > 600`
* Returns a new array with matching objects

---

# 🔹 3. Get total price using reduce

## 💡 Approach

We want a **single value (sum of prices)**

👉 Use `reduce()`

## 💻 Code

```js
const totalPrice = products.reduce((acc, product) => {
  return acc + product.price;
}, 0);

console.log(totalPrice); // 2200
```

---

## 🔍 Step-by-Step Execution

```
Initial accumulator = 0

Step 1: 0 + 1000 = 1000
Step 2: 1000 + 500 = 1500
Step 3: 1500 + 700 = 2200
```

---

## 🧠 Explanation

* `acc` (accumulator) stores the running total
* Starts from `0`
* Adds each product's price one by one

---

# 🔥 Bonus: Chaining Methods

## 💡 Combine multiple operations

```js
const totalExpensivePrice = products
  .filter(p => p.price > 600)
  .reduce((acc, p) => acc + p.price, 0);

console.log(totalExpensivePrice); // 1700
```

---

## 🧠 Why this is powerful

* Cleaner and more readable
* Functional programming style
* Avoids unnecessary variables

---

# 🚀 Final Summary

| Task                   | Method Used |
| ---------------------- | ----------- |
| Get names              | `map()`     |
| Filter expensive items | `filter()`  |
| Calculate total price  | `reduce()`  |

---
👉 Interview follow-up questions

# 🎯 Interview Follow-up Questions — Arrays & Objects

These are the **next-level questions** interviewers typically ask *after* you solve basic `map`, `filter`, `reduce` problems.
They test your **depth of understanding**, not just syntax.

---

# 🔹 1. Can you solve this without using `map`, `filter`, or `reduce`?

## 💡 What interviewer checks

* Do you understand what these methods do internally?
* Can you fall back to basic logic?

---

## 💻 Solution using `for...of`

```js id="j4g9fz"
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Tablet", price: 700 }
];

// Names
const names = [];
for (let product of products) {
  names.push(product.name);
}

// Filter
const expensive = [];
for (let product of products) {
  if (product.price > 600) {
    expensive.push(product);
  }
}

// Total
let total = 0;
for (let product of products) {
  total += product.price;
}
```

---

## 🧠 Insight

Array methods are just **abstractions over loops**

---

# 🔹 2. What is the time complexity of `map`, `filter`, and `reduce`?

## ✅ Answer

All are:

```id="rk9dks"
O(n)
```

---

## 🧠 Explanation

* Each method loops through the array once
* If chained:

```js id="1q4f2v"
arr.map().filter().reduce()
```

👉 Total complexity becomes:

```id="v2r0xn"
O(n) + O(n) + O(n) = O(3n) → O(n)
```

---

## 🎯 Interview Tip

Mention:

> “Time complexity is linear, but chaining increases iterations”

---

# 🔹 3. How can you optimize chained operations?

## 💡 Problem

Multiple loops = less efficient

---

## 💻 Optimized using `reduce`

```js id="v7r71r"
const result = products.reduce((acc, product) => {
  if (product.price > 600) {
    acc.total += product.price;
    acc.items.push(product.name);
  }
  return acc;
}, { total: 0, items: [] });

console.log(result);
```

---

## 🧠 Insight

* Single loop instead of multiple
* Better for large datasets

---

# 🔹 4. What happens if the array is empty?

## 💻 Example

```js id="9d0a8k"
const arr = [];

const sum = arr.reduce((acc, val) => acc + val, 0);

console.log(sum); // 0
```

---

## ⚠️ Important Case

```js id="n3l9yu"
arr.reduce((acc, val) => acc + val);
```

👉 ❌ Throws error (no initial value)

---

## 🎯 Interview Tip

Always provide an **initial value**

---

# 🔹 5. Can `reduce()` replace `map()` and `filter()`?

## ✅ Yes (but not always recommended)

---

## 💻 Example (map using reduce)

```js id="o6n8pq"
const names = products.reduce((acc, product) => {
  acc.push(product.name);
  return acc;
}, []);
```

---

## 💻 Example (filter using reduce)

```js id="p2gm6t"
const expensive = products.reduce((acc, product) => {
  if (product.price > 600) {
    acc.push(product);
  }
  return acc;
}, []);
```

---

## 🧠 Insight

* Powerful but less readable
* Use only when needed

---

# 🔹 6. What are common mistakes with `map()`?

## ❌ Mistake 1: Not returning

```js id="9u2n6p"
const result = products.map(p => {
  p.name;
});
```

👉 Output: `[undefined, undefined, undefined]`

---

## ✅ Fix

```js id="3p1p4l"
const result = products.map(p => p.name);
```

---

## ❌ Mistake 2: Mutating data

```js id="wq4b3n"
products.map(p => {
  p.price += 100; // mutation ❗
  return p;
});
```

---

## ✅ Correct way

```js id="8a5k2z"
const updated = products.map(p => ({
  ...p,
  price: p.price + 100
}));
```

---

# 🔹 7. How do you handle nested objects safely?

## 💡 Problem

```js id="f9s2lx"
const user = {
  name: "Sanjit",
  address: { city: "Dhaka" }
};
```

---

## ❌ Shallow copy issue

```js id="l2v7d1"
const copy = { ...user };
copy.address.city = "Jessore";
```

---

## ✅ Safe deep copy

```js id="c1m8tr"
const safeCopy = structuredClone(user);
```

---

## 🧠 Insight

Nested structures require **deep cloning**

---

# 🔹 8. How would you handle large datasets?

## 💡 Strategies

* Avoid unnecessary chaining
* Use single `reduce`
* Use streaming (for backend)
* Avoid mutation

---

## 💻 Example (optimized)

```js id="m6g3kf"
const result = products.reduce((acc, p) => {
  if (p.price > 600) {
    acc.total += p.price;
  }
  return acc;
}, { total: 0 });
```

---

# 🔹 9. Difference between pure and impure functions?

## ✅ Pure Function

```js id="d3x7wr"
const add = (a, b) => a + b;
```

* No side effects
* Same input → same output

---

## ❌ Impure Function

```js id="c7q2ns"
let total = 0;

function add(num) {
  total += num;
}
```

---

## 🧠 Why important?

* Functional programming
* Predictability
* Easier testing

---

# 🔹 10. Real-world backend question

## 💡 Scenario

API returns products. You need:

* Only available items
* Total price
* Names list

---

## 💻 Solution

```js id="k5y1po"
const result = products.reduce((acc, p) => {
  if (p.price > 600) {
    acc.names.push(p.name);
    acc.total += p.price;
  }
  return acc;
}, { names: [], total: 0 });

console.log(result);
```

---

# 🚀 Final Interview Mindset

* Start simple → then optimize
* Explain your thinking clearly
* Mention trade-offs (readability vs performance)
* Avoid over-engineering

---

If you want next:
👉 🔥 FAANG-level problems
👉 ⚡ Timed mock interview
👉 🧠 JavaScript tricky output questions

Just tell me.

