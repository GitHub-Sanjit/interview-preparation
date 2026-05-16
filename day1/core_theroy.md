# 🧠 JavaScript Core Theory for Interviews

This document is designed to help you **first understand the concepts clearly**, then **practice interview questions with confidence**.

---

# 1. 📌 Variables in JavaScript

JavaScript provides three main ways to declare variables:

## 🔹 var

* Old way of declaring variables
* Function scoped
* Hoisted and initialized as `undefined`
* Can be re-declared and updated

### Example:

```js
var a = 10;
var a = 20; // allowed
```

---

## 🔹 let

* Introduced in ES6
* Block scoped `{}`
* Hoisted but NOT initialized (TDZ applies)
* Cannot be re-declared in same scope

### Example:

```js
let a = 10;
a = 20; // allowed
```

---

## 🔹 const

* Block scoped
* Must be initialized at declaration
* Cannot be reassigned
* Hoisted but in TDZ

### Example:

```js
const a = 10;
a = 20; // ❌ Error
```

---

# 2. 🧠 Hoisting in JavaScript

## 📌 What is Hoisting?

Hoisting is JavaScript’s behavior of **moving declarations to the top of their scope during the creation phase**.

👉 Only declarations are hoisted, not initializations.

---

## 🔹 Example with var

```js
console.log(a);
var a = 10;
```

### How JS sees it:

```js
var a;
console.log(a);
a = 10;
```

### Output:

```
undefined
```

---

## 🔹 Example with let/const

```js
console.log(a);
let a = 10;
```

### Output:

```
ReferenceError
```

👉 Because of TDZ (Temporal Dead Zone)

---

# 3. 🧠 Scope in JavaScript

## 📌 What is Scope?

Scope defines **where variables are accessible in code**.

---

## 🔹 Types of Scope

### 1. Global Scope

* Variables declared outside functions
* Accessible everywhere

```js
let a = 10;
function test() {
  console.log(a);
}
test();
```

---

### 2. Function Scope

* Variables declared inside a function
* Only accessible inside function

```js
function test() {
  var a = 10;
}
console.log(a); // Error
```

---

### 3. Block Scope `{}`

* Applies to `let` and `const`

```js
{
  let a = 10;
}
console.log(a); // Error
```

---

# 4. 🔥 Key Differences (VERY IMPORTANT)

| Feature     | var             | let   | const |
| ----------- | --------------- | ----- | ----- |
| Scope       | Function        | Block | Block |
| Hoisting    | Yes             | Yes   | Yes   |
| Initialized | Yes (undefined) | No    | No    |
| Reassign    | Yes             | Yes   | No    |
| Redeclare   | Yes             | No    | No    |

---

# 5. 🧠 Temporal Dead Zone (TDZ) Quick Idea

* Exists for `let` and `const`
* Variable exists but cannot be accessed before declaration

```js
console.log(a);
let a = 10;
```

👉 ReferenceError due to TDZ

---

# 6. 🧪 Interview Questions (Theory + Practice)

## ❓ 1. What is hoisting?

### Answer:

Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during the creation phase.

---

## ❓ 2. What will be the output?

```js
console.log(a);
var a = 5;
```

### Answer:

```
undefined
```

---

## ❓ 3. What will be the output?

```js
console.log(a);
let a = 5;
```

### Answer:

```
ReferenceError
```

---

## ❓ 4. Difference between var, let, const?

### Answer:

* `var` → function scoped, hoisted with undefined
* `let` → block scoped, TDZ exists
* `const` → block scoped, cannot reassign

---

## ❓ 5. What is scope?

### Answer:

Scope determines where a variable can be accessed in code (global, function, block).

---

## ❓ 6. Predict output:

```js
function test() {
  console.log(a);
  var a = 10;
}
test();
```

### Answer:

```
undefined
```

---

# 7. 🎯 How to Study This (IMPORTANT)

### Step 1: Understand Theory

* Read each concept
* Try to visualize execution

### Step 2: Predict Output

* Cover answers
* Guess result

### Step 3: Explain Out Loud

Say:

* What happens in creation phase
* What happens in execution phase

### Step 4: Verify

* Compare with correct answer

---

# 🚀 Interview Tip

Instead of saying:

> "I think it is undefined"

Say:

> "During creation phase, var is hoisted and initialized as undefined, so it prints undefined"

👉 This shows real understanding, not memorization.
