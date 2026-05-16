# 🧠 JavaScript Interview Questions (var, let, const, Hoisting, Scope)

## 1.

```js
console.log(a);
var a = 10;
```

**Answer:** `undefined`

**Why:**

* `var a` is hoisted and initialized as `undefined`
* Execution phase prints `undefined`

---

## 2.

```js
console.log(a);
let a = 10;
```

**Answer:** `ReferenceError`

**Why:**

* `let` is hoisted but not initialized
* It is in Temporal Dead Zone (TDZ)

---

## 3.

```js
console.log(a);
const a = 10;
```

**Answer:** `ReferenceError`

**Why:**

* Same TDZ behavior as `let`

---

## 4.

```js
var a = 5;
function test() {
  console.log(a);
}
test();
```

**Answer:** `5`

**Why:**

* Lexical scope lookup finds global `a`

---

## 5.

```js
function test() {
  console.log(a);
  var a = 10;
}
test();
```

**Answer:** `undefined`

**Why:**

* `var a` is hoisted inside function
* Shadowing occurs

---

## 6.

```js
let a = 5;
function test() {
  console.log(a);
}
test();
```

**Answer:** `5`

---

## 7.

```js
{
  var a = 10;
}
console.log(a);
```

**Answer:** `10`

**Why:**

* `var` is NOT block scoped

---

## 8.

```js
{
  let a = 10;
}
console.log(a);
```

**Answer:** `ReferenceError`

**Why:**

* `let` is block scoped

---

## 9.

```js
{
  const a = 10;
}
console.log(a);
```

**Answer:** `ReferenceError`

---

## 10.

```js
var a = 10;

function test() {
  console.log(a);
  if (true) {
    var a = 20;
  }
}

test();
```

**Answer:** `undefined`

**Why:**

* Function-scoped `var a` is hoisted inside `test`
* It shadows global `a`

---

## 11.

```js
let a = 10;

function test() {
  console.log(a);
  let a = 20;
}

test();
```

**Answer:** `ReferenceError`

**Why:**

* TDZ inside function scope

---

## 12.

```js
const a = 10;
a = 20;
```

**Answer:** `TypeError`

**Why:**

* `const` cannot be reassigned

---

## 13.

```js
const obj = { name: "John" };
obj.name = "Doe";
console.log(obj.name);
```

**Answer:** `Doe`

**Why:**

* Object reference is constant, properties are mutable

---

## 14.

```js
var a = 1;

function test() {
  a = 2;
  console.log(a);
}
test();
console.log(a);
```

**Answer:** `2 2`

---

## 15.

```js
var a = 1;

function test() {
  var a = 2;
}
test();
console.log(a);
```

**Answer:** `1`

---

## 16.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**Answer:** `3 3 3`

**Why:**

* `var` is function scoped
* Same `i` shared

---

## 17.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**Answer:** `0 1 2`

**Why:**

* `let` creates new binding per iteration

---

## 18.

```js
console.log(typeof a);
var a = 10;
```

**Answer:** `"undefined"`

---

## 19.

```js
console.log(typeof a);
let a = 10;
```

**Answer:** `ReferenceError`

**Why:**

* TDZ applies even with `typeof`

---

## 20.

```js
var a = 10;

function outer() {
  var a = 20;

  function inner() {
    console.log(a);
  }

  return inner;
}

const fn = outer();
fn();
```

**Answer:** `20`

**Why:**

* Closure retains lexical scope

---

# 🧠 Practice Method

Don’t just read.

### Do this:

* Cover the answer
* Predict output
* Explain out loud:

  * Creation phase
  * Execution phase
* Then verify

---

# 🎯 Interview Tip

Instead of:

> “I think it’s undefined…”

Say:

> “During the creation phase, `var a` is initialized as `undefined`…”

👉 That shows strong conceptual understanding.
