# JavaScript Event Loop Deep Dive (Interview Gold Level)

## Example Code

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
````

---

# 🧠 Core Concepts You Must Know

JavaScript runtime has 4 main parts:

## 1. Call Stack

* Executes synchronous code
* LIFO (Last In First Out)

## 2. Web APIs (Browser Environment)

* Handles async tasks like:

  * setTimeout
  * DOM events
  * HTTP requests

## 3. Callback Queue (Task Queue)

* Stores completed async callbacks

## 4. Event Loop

* Moves callback from queue → call stack when stack is empty

---

# 🔥 Step-by-Step Execution Flow

## STEP 1: Global Execution Starts

Call Stack:

```
[ Global Execution Context ]
```

---

## STEP 2: Loop Starts (Synchronous Execution)

```javascript
for (var i = 0; i < 3; i++)
```

### Memory (var is function-scoped)

```
i = undefined → 0 → 1 → 2 → 3
```

---

## STEP 3: setTimeout Calls Web API

Each iteration:

### Iteration 1

```
setTimeout(callback, 1000)
→ sent to Web API
```

### Iteration 2

```
setTimeout(callback, 1000)
→ sent to Web API
```

### Iteration 3

```
setTimeout(callback, 1000)
→ sent to Web API
```

---

## 🌐 Web API State

```
Timer 1 running...
Timer 2 running...
Timer 3 running...
```

All callbacks are waiting.

---

## STEP 4: Loop Finishes

```
i = 3
```

Global execution ends.

Call Stack becomes empty.

---

## STEP 5: After 1 second → Web APIs push callbacks

All timers complete almost together:

```
Callback 1 → Queue
Callback 2 → Queue
Callback 3 → Queue
```

---

## STEP 6: Event Loop Activates

Event Loop checks:

> Is Call Stack empty? → YES

So it pushes callbacks one by one:

---

## STEP 7: Callbacks Execute

### Callback 1

```
console.log(i)
```

But at this time:

```
i = 3
```

Output:

```
3
```

---

### Callback 2

```
3
```

---

### Callback 3

```
3
```

---

# 🎯 Final Output

```
3
3
3
```

---

# 🧠 WHY THIS HAPPENS (MOST IMPORTANT POINT)

## var behavior:

```
Only ONE i exists
Shared across all callbacks
Final value = 3
```

So all callbacks print same value.

---

# 🧠 VISUAL MEMORY MODEL

## During loop:

```
i → single variable
```

## After loop:

```
i = 3
```

## All callbacks:

```
→ refer same i
→ print 3
```

---

# 🔥 EVENT LOOP VISUAL FLOW

```
CALL STACK
   ↓
for loop executes
   ↓
setTimeout → Web APIs
   ↓
Call stack empty
   ↓
Event Loop checks queue
   ↓
Callbacks move to stack
   ↓
console.log(i)
   ↓
output = 3, 3, 3
```

---

# ⚡ WHY CALLBACK DOESN’T CAPTURE OLD VALUE?

Because:

❌ It does NOT store value of i
✔ It stores reference to variable i

---

# 🟢 BONUS: Why let fixes this?

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
```

---

## What changes?

### Instead of 1 variable:

```
i₀ = 0
i₁ = 1
i₂ = 2
```

Each iteration creates a NEW scope.

---

## Web API stores:

```
Callback 1 → i = 0
Callback 2 → i = 1
Callback 3 → i = 2
```

---

## Final Output:

```
0
1
2
```

---

# 🧠 INTERVIEW ONE-LINER

> In the event loop, setTimeout callbacks are moved to Web APIs first, then to the callback queue, and finally executed when the call stack is empty. With `var`, all callbacks share the same variable reference, so they print the final value after loop execution.

---

# 🚀 GOLDEN SUMMARY

| Concept    | var              | let                   |
| ---------- | ---------------- | --------------------- |
| Scope      | Function         | Block                 |
| i variable | Single shared    | New per iteration     |
| Output     | 3,3,3            | 0,1,2                 |
| Reason     | Shared reference | Closure per iteration |

---

# 🧠 FINAL MINDSET

If you understand this flow:

✔ Call Stack
✔ Web APIs
✔ Callback Queue
✔ Event Loop
✔ Scope + Closure

👉 You are already above junior level JavaScript interviews.

