# JavaScript Runtime & Execution: Complete Interview Guide

## Table of Contents
1. [Call Stack](#call-stack)
2. [Web APIs](#web-apis)
3. [Callback Queue](#callback-queue)
4. [Event Loop](#event-loop)
5. [Scope + Closures](#scope--closures)
6. [Interview Questions & Answers](#interview-questions--answers)

---

## Call Stack

### What is it?
The Call Stack is a **LIFO (Last In, First Out)** data structure that tracks function execution. Every time a function is called, it's pushed onto the stack. When it returns, it's popped off.

### How it works:
```javascript
function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    const squared = square(n);
    console.log(squared);
}

printSquare(4);
```

**Step-by-step stack execution:**
```
1. []                           // Empty stack
2. [printSquare(4)]            // printSquare called
3. [printSquare(4), square(4)]  // square called
4. [printSquare(4), square(4), multiply(4,4)] // multiply called
5. [printSquare(4), square(4)]  // multiply returns (16)
6. [printSquare(4)]             // square returns (16)
7. []                           // printSquare returns & logs
```

### Stack Overflow Example:
```javascript
function recursive() {
    recursive();  // No base case!
}
recursive(); // ❌ RangeError: Maximum call stack size exceeded
```

### Key Interview Points:
- **Synchronous** code executes immediately via Call Stack
- JavaScript is **single-threaded** (one Call Stack)
- Stack Frame = each function call + its variables

---

## Web APIs

### What are they?
Browser-provided features that **aren't part of JavaScript** core language. They enable async operations.

### Common Web APIs:
```javascript
// 1. setTimeout/setInterval
setTimeout(() => console.log("Timer"), 1000);

// 2. DOM APIs
document.getElementById("btn").addEventListener("click", () => {
    console.log("Clicked!");
});

// 3. Fetch API
fetch("https://api.example.com/data")
    .then(res => res.json());

// 4. Local Storage
localStorage.setItem("key", "value");

// 5. Console API (technically a Web API)
console.log("Hello");

// 6. Geolocation API
navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords.latitude);
});
```

### How Web APIs work with JS:
```javascript
console.log("Start");  // 1. Call Stack executes

setTimeout(() => {      // 2. setTimeout sent to Web API
    console.log("Timeout");
}, 2000);

console.log("End");    // 3. Call Stack executes

// Web API manages the timer independently
// After 2 seconds, it moves callback to Callback Queue
```

### Key Interview Points:
- Web APIs are **provided by the browser**, NOT the JS engine
- They enable **non-blocking** asynchronous behavior
- Node.js has similar APIs (libuv library)

---

## Callback Queue (Task Queue)

### What is it?
A **FIFO (First In, First Out)** queue that holds callbacks ready to be executed.

### Types of Queues:
```javascript
// 1. Macro-task Queue (Callback Queue)
setTimeout(() => console.log("macro 1"), 0);
setTimeout(() => console.log("macro 2"), 0);

// 2. Micro-task Queue (Higher priority)
Promise.resolve().then(() => console.log("micro 1"));
Promise.resolve().then(() => console.log("micro 2"));

console.log("Start");

// Output:
// Start
// micro 1
// micro 2
// macro 1
// macro 2
```

### Complete Queue Example:
```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

setTimeout(() => console.log("4"), 0);

Promise.resolve().then(() => {
    console.log("5");
    Promise.resolve().then(() => console.log("6"));
});

console.log("7");

// Output: 1, 7, 3, 5, 6, 2, 4
```

### Key Interview Points:
- **Micro-tasks** (Promises, MutationObserver) have **higher priority**
- **Macro-tasks** (setTimeout, setInterval, I/O) lower priority
- Event Loop processes ALL micro-tasks before ONE macro-task

---

## Event Loop

### What is it?
The **coordinator** that decides when to move callbacks from the queue to the Call Stack.

### How it works (Visual):
```
┌─────────────┐     ┌──────────────┐
│ Call Stack  │────▶│ Web APIs     │
│ (Executing) │◀────│ (Timers, etc)│
└─────────────┘     └──────────────┘
       ▲                    │
       │                    ▼
       │             ┌─────────────┐
       │             │ Callback    │
       └─────────────│ Queue       │
                     └─────────────┘
                          ▲
                          │
                    ┌─────┴─────┐
                    │Event Loop │
                    └───────────┘
```

### Event Loop Algorithm:
```javascript
while (true) {
    // 1. Execute all micro-tasks first
    while (microtaskQueue.length > 0) {
        executeMicrotask(microtaskQueue.shift());
    }
    
    // 2. Take ONE macro-task if Call Stack is empty
    if (callbackQueue.length > 0 && callStack.isEmpty()) {
        const callback = callbackQueue.shift();
        callStack.push(callback);
    }
    
    // 3. Render UI if needed (browsers)
}
```

### Complex Event Loop Example:
```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
    Promise.resolve().then(() => console.log("Promise in Timeout"));
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
    setTimeout(() => console.log("Timeout in Promise"), 0);
});

Promise.resolve().then(() => console.log("Promise 2"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise in Timeout
// Timeout in Promise
```

### Blocking Event Loop (BAD Practice):
```javascript
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

// ❌ This blocks the Event Loop for 5 seconds!
const startTime = Date.now();
while (Date.now() - startTime < 5000) {
    // Blocking operation
}

console.log("End");
// Timeout logs AFTER 5+ seconds, not immediately!
```

### Key Interview Points:
- Event Loop **never blocks** (but bad code can)
- Always check Call Stack **AND** Queue
- Rendering happens between macro-tasks
- Micro-tasks can create **infinite loops** (bad!)

---

## Scope + Closures

### Scope Types:

```javascript
// 1. Global Scope
const globalVar = "I'm global";

function demoScope() {
    // 2. Function Scope
    var functionVar = "I'm function-scoped";
    
    if (true) {
        // 3. Block Scope (let/const only)
        let blockVar = "I'm block-scoped";
        var notBlockVar = "I'm still function-scoped";
        
        console.log(blockVar);  // ✅ Works
    }
    
    console.log(functionVar);   // ✅ Works
    console.log(notBlockVar);   // ✅ Works
    console.log(blockVar);      // ❌ ReferenceError
}

console.log(globalVar);      // ✅ Works
console.log(functionVar);    // ❌ ReferenceError
```

### Lexical Scope:
```javascript
const outer = "outside";

function outerFunction() {
    const outerVar = "I'm in outer";
    
    function innerFunction() {
        const innerVar = "I'm in inner";
        
        console.log(outerVar);  // ✅ Accesses outer
        console.log(outer);     // ✅ Accesses global
        console.log(innerVar);  // ✅ Accesses self
    }
    
    innerFunction();
    console.log(innerVar);      // ❌ Cannot access inner
}

outerFunction();
```

### Closures - The Critical Concept:

```javascript
function createCounter() {
    let count = 0;  // Private variable
    
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.decrement();  // 1
console.log(counter.getCount());  // 1
// count variable is NOT accessible directly:
console.log(counter.count);  // undefined
```

### Classic Closure Interview Example:
```javascript
// ❌ WRONG - Using var
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // Prints 3, 3, 3
    }, 1000);
}

// ✅ CORRECT - Using let (block scope)
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // Prints 0, 1, 2
    }, 1000);
}

// ✅ CORRECT - Using closure with IIFE
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j);  // Prints 0, 1, 2
        }, 1000);
    })(i);
}
```

### Practical Closure Use Cases:

**1. Data Privacy/Encapsulation:**
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: (amount) => {
            if (amount > 0) {
                balance += amount;
                return `Deposited $${amount}. New balance: $${balance}`;
            }
        },
        withdraw: (amount) => {
            if (amount <= balance) {
                balance -= amount;
                return `Withdrew $${amount}. New balance: $${balance}`;
            }
            return "Insufficient funds";
        },
        getBalance: () => `$${balance}`
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50));    // Deposited $50. New balance: $150
console.log(account.withdraw(30));   // Withdrew $30. New balance: $120
console.log(account.balance);        // undefined (private!)
```

**2. Function Factories:**
```javascript
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**3. Memoization/Caching:**
```javascript
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key] === undefined) {
            cache[key] = fn(...args);
            console.log("Computing result...");
        }
        return cache[key];
    };
}

const expensiveCalculation = memoize((n) => {
    return n * n * n;
});

console.log(expensiveCalculation(5));  // Computing result... 125
console.log(expensiveCalculation(5));  // 125 (from cache)
```

### Memory Leaks with Closures:
```javascript
function createLeakyClosure() {
    const largeData = new Array(1000000).fill("memory leak");
    
    return function() {
        // Even if we don't use largeData, it stays in memory!
        console.log("Hello");
    };
}

const leaky = createLeakyClosure();
// largeData cannot be garbage collected because closure references it

// ✅ FIX: Only reference what you need
function createGoodClosure() {
    const largeData = new Array(1000000).fill("not leaky");
    
    return function() {
        const neededData = "Hello";
        console.log(neededData);
    };
}
```

---

## Interview Questions & Answers

### Q1: What's the output of this code and why?

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

**Answer:**
```
A
D
C
B
```

**Explanation:**
1. "A" - Synchronous, executes immediately
2. "D" - Synchronous, executes immediately
3. "C" - Micro-task (Promise), executes before macro-tasks
4. "B" - Macro-task (setTimeout), executes after micro-tasks

---

### Q2: Fix the closure bug in this code:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}
// Current output: 5,5,5,5,5
// Desired output: 0,1,2,3,4
```

**Answer (3 solutions):**

```javascript
// Solution 1: Use let instead of var
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), i * 1000);
}

// Solution 2: IIFE with closure
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => console.log(j), j * 1000);
    })(i);
}

// Solution 3: Bind method
for (var i = 0; i < 5; i++) {
    setTimeout(console.log.bind(console, i), i * 1000);
}
```

---

### Q3: Will the Event Loop ever stop? What keeps it running?

**Answer:**
The Event Loop runs indefinitely as long as there's:
1. Code being executed in the Call Stack
2. Pending micro-tasks
3. Pending macro-tasks
4. Open connections (WebSockets, event listeners, etc.)

The browser/Node.js terminates the process when:
- All tasks are completed
- No active handles (setTimeout, setInterval, etc.)
- No open connections

---

### Q4: Explain the difference between:

```javascript
// Scenario 1
setTimeout(() => console.log("A"), 0);

// Scenario 2
Promise.resolve().then(() => console.log("B"));

// Scenario 3
console.log("C");
```

**Answer:**
- **Scenario 3** executes FIRST (synchronous, Call Stack)
- **Scenario 2** executes SECOND (micro-task, higher priority)
- **Scenario 1** executes THIRD (macro-task, lower priority)

**Priority order:** Sync Code > Micro-tasks > Macro-tasks

---

### Q5: What does this code output and why?

```javascript
function outer() {
    let count = 0;
    
    function inner() {
        count++;
        console.log(count);
    }
    
    return inner;
}

const fn1 = outer();
const fn2 = outer();

fn1();  // ?
fn1();  // ?
fn2();  // ?
fn1();  // ?
```

**Answer:**
```
1
2
1
3
```

**Explanation:** 
Each call to `outer()` creates a **separate closure** with its own `count` variable. `fn1` and `fn2` have independent counters because they capture different `count` variables.

---

### Q6: Create a function that logs numbers 1-10 every second using setTimeout (classic interview question)

**Answer:**
```javascript
// Solution 1: Using let (ES6)
for (let i = 1; i <= 10; i++) {
    setTimeout(() => console.log(i), i * 1000);
}

// Solution 2: Using closure with var
for (var i = 1; i <= 10; i++) {
    (function(j) {
        setTimeout(() => console.log(j), j * 1000);
    })(i);
}

// Solution 3: Recursive with setTimeout
function printNumbers(n) {
    if (n > 10) return;
    setTimeout(() => {
        console.log(n);
        printNumbers(n + 1);
    }, 1000);
}
printNumbers(1);
```

---

### Q7: Explain the output with async/await:

```javascript
async function test() {
    console.log("1");
    await Promise.resolve();
    console.log("2");
    setTimeout(() => console.log("3"), 0);
    console.log("4");
}

console.log("5");
test();
console.log("6");
```

**Answer:**
```
5
1
6
2
4
3
```

**Explanation:**
1. "5" logs (sync)
2. test() called: "1" logs (sync)
3. await makes rest of test() a micro-task
4. "6" logs (sync)
5. Micro-task executes: logs "2", then "4" (sync in micro-task)
6. setTimeout macro-task: logs "3" last

---

### Q8: Design a function that can only be called once (Singleton pattern with closure)

**Answer:**
```javascript
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn(...args);
            return result;
        }
        return undefined;
    };
}

const initialize = once(() => {
    console.log("Initializing...");
    return { status: "ready" };
});

console.log(initialize()); // "Initializing..." then { status: "ready" }
console.log(initialize()); // undefined (nothing happens)
console.log(initialize()); // undefined
```

---

## Quick Reference Card

| Concept | Key Points | Common Pitfalls |
|---------|------------|-----------------|
| **Call Stack** | LIFO, single-threaded | Stack overflow, blocking |
| **Web APIs** | Browser features | Not JS, async callbacks |
| **Callback Queue** | FIFO, macro-tasks | Order of execution |
| **Event Loop** | Coordinates execution | Blocking the loop |
| **Scope** | Global/Function/Block | Var vs let/const |
| **Closures** | Function + outer scope | Memory leaks, stale closures |

## Pro Tips for Interviews

1. **Draw diagrams!** Show the Call Stack, Web APIs, Queue, and Event Loop
2. **Walk through code line by line** with execution context
3. **Remember priority:** Synchronous > Micro-tasks > Macro-tasks
4. **Closures capture variables by reference** (not value) - important for loops
5. **Always mention** "single-threaded" and "non-blocking" when discussing async

---

## Practice Problems

Try these on your own:

1. Implement `setTimeout` using `setInterval` (and vice versa)
2. Create a throttle function using closures
3. Build a debounce function with immediate execution option
4. Implement a promise queue that processes tasks sequentially
5. Create a function memoizer that works with multiple arguments

---

**Good luck with your interview! 🚀**
```