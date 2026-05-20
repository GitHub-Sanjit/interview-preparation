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
