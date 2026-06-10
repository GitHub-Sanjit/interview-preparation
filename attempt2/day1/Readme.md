# JavaScript Interview Preparation Notes

## Topics: Variables, Scope, and Hoisting

---

# 1. JavaScript Variables

Variables are containers used to store data values. JavaScript provides three ways to declare variables:

* `var`
* `let`
* `const`

---

## 1.1 var

### Characteristics

* Function-scoped
* Can be re-declared
* Can be updated
* Hoisted and initialized with `undefined`
* Introduced before ES6

### Example

```javascript
var name = "Sanjit";
console.log(name); // Sanjit

name = "John";
console.log(name); // John

var name = "David";
console.log(name); // David
```

### Interview Question

**Q: Can `var` be re-declared?**

✅ Yes.

```javascript
var age = 25;
var age = 30;

console.log(age); // 30
```

---

## 1.2 let

Introduced in ES6.

### Characteristics

* Block-scoped
* Cannot be re-declared in the same scope
* Can be updated
* Hoisted but not initialized
* Has Temporal Dead Zone (TDZ)

### Example

```javascript
let city = "Dhaka";

city = "Jessore";

console.log(city); // Jessore
```

### Invalid Example

```javascript
let score = 80;
let score = 90; // SyntaxError
```

---

## 1.3 const

Used for values that should not be reassigned.

### Characteristics

* Block-scoped
* Cannot be re-declared
* Cannot be reassigned
* Must be initialized during declaration
* Hoisted but in TDZ

### Example

```javascript
const PI = 3.1416;

console.log(PI);
```

### Invalid Example

```javascript
const country;

country = "Bangladesh";

// SyntaxError: Missing initializer
```

### Reassignment Error

```javascript
const PORT = 3000;

PORT = 5000;

// TypeError
```

---

## const with Objects and Arrays

The reference cannot change, but properties/elements can.

### Object Example

```javascript
const user = {
    name: "Sanjit",
    age: 25
};

user.age = 26;

console.log(user);
// { name: "Sanjit", age: 26 }
```

### Array Example

```javascript
const numbers = [1, 2, 3];

numbers.push(4);

console.log(numbers);
// [1, 2, 3, 4]
```

### Invalid

```javascript
const arr = [1, 2];

arr = [3, 4];

// TypeError
```

---

# var vs let vs const

| Feature                     | var       | let   | const |
| --------------------------- | --------- | ----- | ----- |
| Scope                       | Function  | Block | Block |
| Reassign                    | Yes       | Yes   | No    |
| Redeclare                   | Yes       | No    | No    |
| Hoisted                     | Yes       | Yes   | Yes   |
| Initialized During Hoisting | undefined | No    | No    |
| TDZ                         | No        | Yes   | Yes   |

---

# 2. Scope in JavaScript

Scope determines where variables are accessible.

Types:

1. Global Scope
2. Function Scope
3. Block Scope
4. Lexical Scope

---

# 2.1 Global Scope

Variables declared outside functions are globally accessible.

```javascript
let username = "Sanjit";

function displayUser() {
    console.log(username);
}

displayUser(); // Sanjit
```

---

# 2.2 Function Scope

Variables declared with `var` inside functions are accessible only within that function.

```javascript
function greet() {
    var message = "Hello";
    console.log(message);
}

greet();

console.log(message);

// ReferenceError
```

---

# 2.3 Block Scope

Variables declared with `let` and `const` are limited to blocks.

Blocks include:

* if statements
* loops
* switch statements

Example:

```javascript
if (true) {
    let x = 10;
    const y = 20;

    console.log(x); // 10
    console.log(y); // 20
}

console.log(x); // ReferenceError
console.log(y); // ReferenceError
```

---

## var Ignores Block Scope

```javascript
if (true) {
    var name = "JavaScript";
}

console.log(name);
// JavaScript
```

Interviewers love asking this question.

---

# 2.4 Lexical Scope

Inner functions have access to outer function variables.

```javascript
function outer() {
    let outerVar = "I am outer";

    function inner() {
        console.log(outerVar);
    }

    inner();
}

outer();
```

Output:

```javascript
I am outer
```

---

## Nested Lexical Scope

```javascript
function first() {
    let a = 10;

    function second() {
        let b = 20;

        function third() {
            console.log(a);
            console.log(b);
        }

        third();
    }

    second();
}

first();
```

Output:

```javascript
10
20
```

---

# Scope Chain

JavaScript searches for variables from inner scope to outer scope.

```javascript
let globalVar = "Global";

function first() {
    let firstVar = "First";

    function second() {
        let secondVar = "Second";

        console.log(globalVar);
        console.log(firstVar);
        console.log(secondVar);
    }

    second();
}

first();
```

---

# 3. Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation.

Only declarations are hoisted, not initializations.

---

## var Hoisting

```javascript
console.log(a);

var a = 10;
```

JavaScript interprets it as:

```javascript
var a;

console.log(a);

a = 10;
```

Output:

```javascript
undefined
```

---

## let Hoisting

```javascript
console.log(age);

let age = 25;
```

Output:

```javascript
ReferenceError:
Cannot access 'age' before initialization
```

Although `let` is hoisted, it remains in the Temporal Dead Zone.

---

## const Hoisting

```javascript
console.log(PI);

const PI = 3.14;
```

Output:

```javascript
ReferenceError
```

---

# Temporal Dead Zone (TDZ)

The period between entering scope and variable initialization.

Example:

```javascript
{
    console.log(count);

    let count = 5;
}
```

The variable exists but cannot be accessed.

---

# Function Hoisting

---

## Function Declaration Hoisting

Function declarations are fully hoisted.

```javascript
greet();

function greet() {
    console.log("Hello");
}
```

Output:

```javascript
Hello
```

---

## Function Expression Hoisting

```javascript
greet();

var greet = function() {
    console.log("Hello");
};
```

Output:

```javascript
TypeError: greet is not a function
```

Equivalent to:

```javascript
var greet;

greet();

greet = function() {
    console.log("Hello");
};
```

---

## Arrow Function Hoisting

```javascript
sayHi();

const sayHi = () => {
    console.log("Hi");
};
```

Output:

```javascript
ReferenceError
```

---

# Tricky Interview Questions

---

## Question 1

```javascript
console.log(a);

var a = 10;
```

Output:

```javascript
undefined
```

---

## Question 2

```javascript
console.log(a);

let a = 10;
```

Output:

```javascript
ReferenceError
```

---

## Question 3

```javascript
if (true) {
    var x = 5;
    let y = 10;
}

console.log(x);
console.log(y);
```

Output:

```javascript
5
ReferenceError
```

---

## Question 4

```javascript
var x = 1;

function test() {
    console.log(x);

    var x = 2;

    console.log(x);
}

test();
```

Output:

```javascript
undefined
2
```

Reason:

```javascript
function test() {
    var x;

    console.log(x);

    x = 2;

    console.log(x);
}
```

---

## Question 5

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
```

Output:

```javascript
3
3
3
```

Because `var` is function-scoped.

---

## Solution Using let

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
```

Output:

```javascript
0
1
2
```

---

# Frequently Asked Interview Questions

### 1. Difference between var, let, and const?

Focus on:

* Scope
* Redeclaration
* Reassignment
* Hoisting
* TDZ

---

### 2. What is hoisting?

JavaScript moves declarations to the top of their scope before execution.

---

### 3. What is the Temporal Dead Zone?

The period during which `let` and `const` variables exist but cannot be accessed before initialization.

---

### 4. Why is let preferred over var?

* Avoids accidental redeclaration
* Supports block scope
* Prevents scope-related bugs

---

### 5. When should you use const?

Use `const` by default.

Use `let` only when reassignment is required.

Avoid `var` in modern JavaScript.

---

# Interview Best Practices

✅ Use `const` by default

✅ Use `let` when reassignment is needed

❌ Avoid `var` in modern applications

✅ Understand hoisting behavior

✅ Practice predicting outputs from code snippets

✅ Understand lexical scope and scope chain deeply

---

# Quick Revision Cheat Sheet

```text
var:
- Function Scoped
- Re-declare ✓
- Reassign ✓
- Hoisted → undefined

let:
- Block Scoped
- Re-declare ✗
- Reassign ✓
- Hoisted → TDZ

const:
- Block Scoped
- Re-declare ✗
- Reassign ✗
- Hoisted → TDZ
```

---

# Most Important Interview Concepts

1. var vs let vs const
2. Block Scope vs Function Scope
3. Lexical Scope
4. Scope Chain
5. Hoisting
6. Temporal Dead Zone
7. Function Declaration vs Function Expression Hoisting
8. Predicting Output Questions

Master these topics thoroughly because they appear in almost every JavaScript interview.
