# 📅 DAY 3 — Async JavaScript

## 🧠 1. Event Loop (Core Concept)

JavaScript is **single-threaded**, meaning it can execute only one piece of code at a time. But it still handles asynchronous operations like API calls, timers, and file reads efficiently using something called the **Event Loop**.

### 🔁 How it works

There are 3 main parts:

* **Call Stack** → where functions are executed
* **Web APIs / Node APIs** → handle async tasks (setTimeout, fetch, etc.)
* **Callback Queue / Microtask Queue** → stores callbacks waiting to execute

### ⚙️ Execution Flow

1. Code runs line by line in the **call stack**
2. Async functions (like `setTimeout`) are sent to Web APIs
3. Once finished, their callbacks go to queues:

   * **Microtask Queue** → Promises
   * **Callback Queue** → setTimeout, setInterval
4. Event loop checks:

   * If call stack is empty → executes tasks from queues
   * **Microtasks are executed before callbacks**

---

### 📌 Example

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

### ✅ Output

```
Start
End
Promise
Timeout
```

### 💡 Why?

* `Promise` goes to **microtask queue** → higher priority
* `setTimeout` goes to **callback queue** → lower priority

---

## 🧠 2. Promises

A **Promise** represents a value that may be available now, later, or never.

### 🔄 States of a Promise

* **Pending** → initial state
* **Fulfilled** → operation successful
* **Rejected** → operation failed

---

### 📌 Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Data received");
  } else {
    reject("Error occurred");
  }
});
```

---

### 📌 Consuming a Promise

```js
myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Done");
  });
```

---

### 📌 Real Example (API simulation)

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User data loaded");
    }, 2000);
  });
}

fetchData().then(console.log);
```

---

## 🧠 3. setTimeout vs Promise

This is a **very important interview question**.

### 🔍 Key Difference

| Feature    | setTimeout     | Promise                        |
| ---------- | -------------- | ------------------------------ |
| Queue Type | Callback Queue | Microtask Queue                |
| Priority   | Lower          | Higher                         |
| Execution  | After delay    | Immediately after stack clears |

---

### 📌 Example

```js
setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));
```

### ✅ Output

```
Promise
setTimeout
```

### 💡 Explanation

Even with `0ms`, `setTimeout` waits until:

1. Call stack is empty
2. All microtasks are executed

---

## 🧠 4. async / await

`async/await` is **syntactic sugar** over Promises. It makes async code look synchronous and easier to read.

---

### 🔑 Rules

* `async` function **always returns a Promise**
* `await` pauses execution until Promise resolves
* Can only use `await` inside `async` functions

---

### 📌 Basic Example

```js
async function getData() {
  return "Hello";
}

getData().then(console.log);
```

---

### 📌 Using await

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 2000);
  });
}

async function main() {
  console.log("Start");

  const data = await fetchData();
  console.log(data);

  console.log("End");
}

main();
```

### ✅ Output

```
Start
(Data after 2 seconds)
Data fetched
End
```

---

### ⚠️ Important Behavior

```js
async function test() {
  console.log(1);

  await Promise.resolve();

  console.log(2);
}

console.log(3);
test();
console.log(4);
```

### ✅ Output

```
3
1
4
2
```

### 💡 Why?

* Code after `await` goes to **microtask queue**

---

## 🧠 5. Error Handling in async/await

```js
async function fetchData() {
  try {
    const res = await Promise.reject("Error!");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

fetchData();
```

---

## 🧠 6. Sequential vs Parallel Execution

### ❌ Sequential (slow)

```js
await task1();
await task2();
```

### ✅ Parallel (faster)

```js
await Promise.all([task1(), task2()]);
```

---

## 🎯 Interview Summary

* JavaScript is single-threaded but uses Event Loop for async
* Microtasks (Promises) run before macrotasks (setTimeout)
* async/await is just cleaner Promise syntax
* await pauses only inside async function, not entire program
* Promise.all is best for parallel execution

---

## 🚀 Practice Suggestions

1. Predict output of mixed async code
2. Rewrite `.then()` chains using async/await
3. Build small API call simulation
4. Solve interview questions like:

   * Execution order problems
   * Promise chaining
   * Error handling

---

## 🔚 Final Thought

If you deeply understand **Event Loop + Microtask Queue**, you can solve 80% of tricky async interview questions.

Focus less on memorizing and more on **execution flow in your head**.
