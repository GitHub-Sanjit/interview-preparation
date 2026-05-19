# 🚀 Day 3 — Async JavaScript Practice (Answers + Explanations)

This file focuses on **real interview-style practice problems** with detailed explanations so you can train your thinking, not just memorize.

---

## 🧠 1. Predict Output (Mixed Async Code)

### 📌 Example 1

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

### ✅ Output

```
A
D
C
B
```

### 💡 Explanation

1. Synchronous runs first → A, D
2. Promise → microtask queue → runs next → C
3. setTimeout → callback queue → runs last → B

---

### 📌 Example 2 (Tricky)

```js
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => {
  console.log(3);
  Promise.resolve().then(() => console.log(4));
});

console.log(5);
```

### ✅ Output

```
1
5
3
4
2
```

### 💡 Explanation

* Nested promises still go to microtask queue
* All microtasks finish before moving to setTimeout

---

## 🔁 2. Rewrite .then() → async/await

### 📌 Original Code

```js
function getUser() {
  return fetch("/user").then(res => res.json());
}

function main() {
  getUser()
    .then(user => {
      console.log(user);
      return fetch(`/posts/${user.id}`);
    })
    .then(res => res.json())
    .then(posts => console.log(posts))
    .catch(err => console.error(err));
}
```

---

### ✅ Converted Version

```js
async function main() {
  try {
    const userRes = await fetch("/user");
    const user = await userRes.json();

    console.log(user);

    const postRes = await fetch(`/posts/${user.id}`);
    const posts = await postRes.json();

    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}
```

### 💡 Explanation

* `await` replaces `.then()` chaining
* `try/catch` replaces `.catch()`
* Code becomes linear and easier to read

---

## 🌐 3. Small API Call Simulation

### 📌 Example

```js
function fakeApi(data, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

async function fetchAll() {
  console.log("Start");

  const user = await fakeApi("User Data", 1000);
  console.log(user);

  const posts = await fakeApi("Posts Data", 2000);
  console.log(posts);

  console.log("End");
}

fetchAll();
```

---

### ⚡ Optimized Version (Parallel)

```js
async function fetchAllFast() {
  console.log("Start");

  const [user, posts] = await Promise.all([
    fakeApi("User Data", 1000),
    fakeApi("Posts Data", 2000),
  ]);

  console.log(user);
  console.log(posts);

  console.log("End");
}
```

### 💡 Explanation

* First version = sequential (3 seconds)
* Second version = parallel (~2 seconds)

---

## 🔗 4. Promise Chaining

### 📌 Example

```js
Promise.resolve(5)
  .then(num => num * 2)
  .then(num => num + 3)
  .then(console.log);
```

### ✅ Output

```
13
```

### 💡 Explanation

* 5 → 10 → 13
* Each `.then()` receives previous result

---

### 📌 Error in Chain

```js
Promise.resolve()
  .then(() => {
    throw new Error("Something broke");
  })
  .then(() => console.log("Won't run"))
  .catch(err => console.log(err.message));
```

### ✅ Output

```
Something broke
```

---

## ⏱️ 5. Execution Order Problems

### 📌 Example

```js
async function test() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

console.log("3");
test();
console.log("4");
```

### ✅ Output

```
3
1
4
2
```

### 💡 Explanation

* `await` pauses and pushes remaining code to microtask queue

---

## ⚠️ 6. Error Handling

### 📌 Promise Style

```js
fetch("/wrong-url")
  .then(res => res.json())
  .catch(err => console.log("Error caught", err));
```

---

### 📌 async/await Style

```js
async function getData() {
  try {
    const res = await fetch("/wrong-url");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error caught", err);
  }
}
```

---

## 🎯 Final Takeaways

* Microtasks (Promises) always run before macrotasks (setTimeout)
* async/await is just syntactic sugar over Promises
* Use `Promise.all` for parallel execution
* Always handle errors (try/catch or .catch)
* Practice output prediction — most interview questions are based on this

---

## 🧪 Challenge for You

Predict this output:

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

async function demo() {
  console.log("Inside");
  await Promise.resolve();
  console.log("After await");
}

demo();

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Try solving it before checking online 🚀
