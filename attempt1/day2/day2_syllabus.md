# 🧠 JavaScript Interview Guide: Execution Context & Closures

---

## 📌 1. Execution Context (Deep Dive)

### ✅ What is Execution Context?

Execution Context is the environment in which JavaScript code is executed. It contains everything needed to run the code: variables, functions, and the scope chain.

Think of it like a **box** where your code runs.

---

### 🔁 Types of Execution Context

1. **Global Execution Context (GEC)**

   * Created when the script first runs
   * Only one per program
   * `this` refers to `window` (browser) or `global` (Node.js)

2. **Function Execution Context (FEC)**

   * Created whenever a function is called
   * Each function call gets its own context

3. **Eval Execution Context** (rare)

---

### ⚙️ Phases of Execution Context

#### 1. Creation Phase

* Memory is allocated
* Variables are initialized as `undefined`
* Functions are stored fully in memory

#### 2. Execution Phase

* Code runs line by line
* Values are assigned
* Functions are invoked

---

### 🧪 Example

```js
var x = 10;

function test() {
  var y = 20;
  console.log(x + y);
}

test();
```

### 🧠 What happens?

* Global Execution Context created
* `x` stored as `undefined` → later assigned `10`
* `test()` stored in memory
* When `test()` runs → new Function Execution Context created

---

### 🌍 Real-World Example (Project)

Imagine a **Node.js API server**:

```js
let user = "global user";

function handleRequest() {
  let user = "request user";

  function logUser() {
    console.log(user);
  }

  logUser();
}

handleRequest();
```

👉 Each request creates a new execution context, ensuring isolation between requests.

---

### 🎯 Interview Questions (Execution Context)

#### Q1: What is Execution Context?

**Answer:**
It is the environment where JavaScript code runs, containing variable scope, `this`, and references needed to execute code.

---

#### Q2: What are the phases?

**Answer:**

* Creation Phase
* Execution Phase

---

#### Q3: What is the call stack?

**Answer:**
It tracks execution contexts. When a function is called, it's pushed to the stack, and popped when finished.

---

#### Q4: Difference between Global and Function Execution Context?

**Answer:**
Global runs once; Function context is created per function call.

---

---

## 🔒 2. Closures (Deep Dive)

### ✅ What is a Closure?

A closure is when a function "remembers" variables from its outer scope even after the outer function has finished executing.

👉 In simple terms:

> A function + its lexical environment = Closure

---

### 🧪 Example

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
```

### 🧠 Why it works?

* `inner()` still has access to `count`
* Because of closure (lexical scope is preserved)

---

### 🌍 Real-World Use Cases

#### 1. Data Privacy (Encapsulation)

```js
function createUser() {
  let password = "12345";

  return {
    checkPassword(input) {
      return input === password;
    }
  };
}

const user = createUser();
console.log(user.checkPassword("12345"));
```

👉 Password is private (cannot access directly)

---

#### 2. API Call Caching (Performance Optimization)

```js
function createCache() {
  let cache = {};

  return function(url) {
    if (cache[url]) {
      return cache[url];
    }

    let result = `Fetching ${url}`;
    cache[url] = result;
    return result;
  };
}

const fetchData = createCache();
fetchData("/users");
fetchData("/users"); // cached
```

---

#### 3. Event Handlers (Frontend)

```js
function setupButton() {
  let count = 0;

  document.getElementById("btn").onclick = function () {
    count++;
    console.log(count);
  };
}
```

👉 Button click remembers previous count

---

### ⚠️ Common Pitfall

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

👉 Output: 3, 3, 3

Fix using `let`:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

---

### 🎯 Interview Questions (Closures)

#### Q1: What is a closure?

**Answer:**
A function that retains access to variables from its lexical scope even after the outer function has executed.

---

#### Q2: Why are closures useful?

**Answer:**

* Data hiding
* State management
* Performance optimization (caching)

---

#### Q3: Can closures cause memory leaks?

**Answer:**
Yes, if unused closures keep references to variables, preventing garbage collection.

---

#### Q4: Difference between closure and scope?

**Answer:**
Scope defines accessibility; closure is when a function remembers its scope.

---

#### Q5: Real-world use case?

**Answer:**

* React hooks
* Middleware in Express
* Debounce/throttle functions

---

## 🚀 Final Tips for Interview

* Always explain with **example + real-world use case**
* Mention **call stack + lexical scope** for strong answers
* Practice explaining in simple terms

---

## 🧪 Bonus Practice Questions (With Answers)

### 1. What is lexical scope?

**Answer:**
Lexical scope means that the accessibility of variables is determined by their position in the source code (where they are written).

👉 Inner functions can access variables from their parent functions.

```js
function outer() {
  let name = "Sanjit";

  function inner() {
    console.log(name);
  }

  inner();
}
```

👉 `inner()` can access `name` because of lexical scope.

---

### 2. How does JavaScript manage memory?

**Answer:**
JavaScript uses **automatic memory management (Garbage Collection)**.

* Memory is allocated when variables/functions are created
* Memory is freed when variables are no longer referenced

👉 Uses a concept called **Mark-and-Sweep Algorithm**:

* It marks variables that are still reachable
* Removes those that are not reachable

```js
let user = { name: "Sanjit" };
user = null; // eligible for garbage collection
```

---

### 3. What is hoisting and how is it related?

**Answer:**
Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the creation phase of execution context.

* `var` is hoisted and initialized as `undefined`
* `let` and `const` are hoisted but stay in **Temporal Dead Zone (TDZ)**

```js
console.log(a); // undefined
var a = 5;
```

👉 Related to Execution Context because hoisting happens during the **creation phase**.

---

### 4. Explain scope chain.

**Answer:**
Scope chain is the mechanism JavaScript uses to find variables.

👉 If a variable is not found in the current scope, JavaScript looks in the parent scope, then continues upward until the global scope.

```js
let a = 10;

function outer() {
  let b = 20;

  function inner() {
    let c = 30;
    console.log(a, b, c);
  }

  inner();
}
```

👉 JavaScript resolves variables like:
`inner → outer → global`

---

### 5. What happens when a function returns another function?

**Answer:**
When a function returns another function, the returned function keeps access to the outer function’s variables through **closure**.

```js
function outer() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

👉 Even after `outer()` is finished, `count` is preserved in memory.

---

💡 Tip: In interviews, always connect these answers with **Execution Context + Closures + Scope** to show deeper understanding.
