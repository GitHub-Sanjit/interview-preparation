# 🧠 JavaScript Hoisting (Interview Guide)

This document explains **JavaScript Hoisting in a clear, interview-focused way** with step-by-step execution, diagrams, and examples.

---

# 📌 1. What is Hoisting?

**Hoisting** is JavaScript’s behavior where:

> Variable and function declarations are moved to the top of their scope during the creation phase (before code execution).

⚠️ Important:

* Only declarations are hoisted
* Initializations are NOT hoisted

---

# ⚙️ 2. How JavaScript Executes Code

JavaScript runs in 2 phases:

## 🔹 Phase 1: Creation Phase (Memory Allocation)

* Variables are registered in memory
* Functions are stored completely
* `var` is initialized as `undefined`
* `let` and `const` go into TDZ (Temporal Dead Zone)

## 🔹 Phase 2: Execution Phase

* Code runs line by line
* Assignments happen
* Functions are called

---

# 🧠 3. Hoisting Diagram (Core Concept)

## Example Code:

```js
console.log(a);
var a = 10;
```

---

## 🔹 Creation Phase (Before execution)

```
a → undefined
```

---

## 🔹 Execution Phase

```
console.log(a) → undefined
a = 10
```

---

# 📌 4. Hoisting with var

```js
console.log(a);
var a = 5;
```

## Output:

```
undefined
```

## Why?

* `var a` is hoisted
* Initialized as `undefined`

---

# 📌 5. Hoisting with let

```js
console.log(a);
let a = 10;
```

## Output:

```
ReferenceError
```

## Why?

* `let` is hoisted
* BUT not initialized
* Exists in TDZ

---

# 📌 6. Hoisting with const

```js
console.log(a);
const a = 20;
```

## Output:

```
ReferenceError
```

## Why?

* Same TDZ behavior as `let`
* Must be initialized immediately

---

# 📌 7. Hoisting with Function Declarations

```js
sayHi();

function sayHi() {
  console.log("Hello");
}
```

## Output:

```
Hello
```

## Why?

* Function declarations are fully hoisted
* Both name + body are available

---

# 📌 8. Hoisting with Function Expressions

```js
sayHi();

var sayHi = function () {
  console.log("Hello");
};
```

## Output:

```
TypeError: sayHi is not a function
```

## Why?

Creation phase:

```
sayHi → undefined
```

Execution:

```
sayHi() → undefined() ❌ error
```

---

# 📌 9. Hoisting with let Function Expression

```js
sayHi();

let sayHi = function () {
  console.log("Hello");
};
```

## Output:

```
ReferenceError
```

## Why?

* TDZ prevents access before initialization

---

# 📌 10. Hoisting Inside Function Scope

```js
function test() {
  console.log(a);
  var a = 10;
}
test();
```

## Output:

```
undefined
```

## Why?

Inside function:

```
a → undefined (hoisted)
```

---

# 📌 11. Hoisting + Block Scope Example

```js
{
  console.log(a);
  let a = 5;
}
```

## Output:

```
ReferenceError
```

## Why?

* `let` is block scoped
* Exists in TDZ inside block

---

# ⚠️ 12. Common Interview Traps

## Trap 1

```js
console.log(typeof a);
let a = 10;
```

👉 Output:

```
ReferenceError
```

---

## Trap 2

```js
var a = 1;
function test() {
  console.log(a);
  var a = 2;
}
test();
```

👉 Output:

```
undefined
```

---

## Trap 3

```js
let a = 10;
function test() {
  console.log(a);
  let a = 20;
}
test();
```

👉 Output:

```
ReferenceError
```

---

# 🧠 13. Summary Table

| Feature     | var       | let   | const |
| ----------- | --------- | ----- | ----- |
| Hoisted     | Yes       | Yes   | Yes   |
| Initialized | undefined | No    | No    |
| TDZ         | No        | Yes   | Yes   |
| Scope       | Function  | Block | Block |

---

# 🎯 14. Interview Answer (Best Way)

### ❓ What is Hoisting?

👉 Best Answer:

> Hoisting is JavaScript’s behavior where variable and function declarations are moved to the top of their scope during the creation phase. Variables declared with var are initialized as undefined, while let and const remain in the Temporal Dead Zone until execution reaches their declaration.

---

# 🚀 15. How to Master Hoisting

### Step 1: Visualize Creation Phase

* Imagine memory setup before execution

### Step 2: Predict Output

* Cover answer and guess result

### Step 3: Check Execution Flow

* Run line by line mentally

---

# 🧠 Final Mental Model

```
Creation Phase → Memory Setup (Hoisting)
Execution Phase → Code Runs
```
