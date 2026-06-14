# Question 5: Main Query vs Subquery (Interview Preparation Notes)
**Question 5:**  
What is the difference between a main query and a subquery? In what scenarios would you choose to use a subquery over a standard JOIN operation?

## 1. What is a Main Query?

A **main query** (also called outer query) is the primary SQL statement that retrieves or manipulates data directly from one or more tables.

It can:
- Return final result set to the user
- Contain JOINs, WHERE, GROUP BY, ORDER BY, etc.
- Optionally include subqueries inside it

### Example:
```sql
SELECT user_id, full_name
FROM Users;
````

---

## 2. What is a Subquery?

A **subquery** is a query written inside another SQL query. It is also called:

* Inner query
* Nested query

It is executed first, and its result is used by the outer query.

### Example:

```sql
SELECT full_name
FROM Users
WHERE user_id IN (
    SELECT user_id
    FROM Bookings
);
```

Here:

* Inner query → finds users who made bookings
* Outer query → fetches their names

---

## 3. Key Difference: Main Query vs Subquery

| Feature     | Main Query      | Subquery                     |
| ----------- | --------------- | ---------------------------- |
| Execution   | Executes last   | Executes first               |
| Dependency  | Independent     | Dependent on outer query     |
| Usage       | Final output    | Intermediate result          |
| Position    | Outer level     | Inside SELECT / WHERE / FROM |
| Readability | Usually simpler | Can become complex if nested |

---

## 4. Types of Subqueries

### 1. Scalar Subquery (returns single value)

```sql
SELECT full_name,
       (SELECT COUNT(*) FROM Bookings WHERE Bookings.user_id = Users.user_id) AS total_bookings
FROM Users;
```

---

### 2. Multi-row Subquery

```sql
SELECT *
FROM Users
WHERE user_id IN (
    SELECT user_id FROM Bookings
);
```

---

### 3. Correlated Subquery (depends on outer query)

```sql
SELECT u.full_name
FROM Users u
WHERE EXISTS (
    SELECT 1
    FROM Bookings b
    WHERE b.user_id = u.user_id
);
```

---

## 5. Subquery vs JOIN (VERY IMPORTANT INTERVIEW TOPIC)

### JOIN Approach:

```sql
SELECT u.full_name, b.booking_id
FROM Users u
JOIN Bookings b ON u.user_id = b.user_id;
```

### Subquery Approach:

```sql
SELECT full_name
FROM Users
WHERE user_id IN (
    SELECT user_id FROM Bookings
);
```

---

## 6. When to Use Subquery Instead of JOIN?

Use a **subquery** when:

### ✔ 1. You need filtering, not combining data

Example: "Find users who booked tickets"

* You don’t need booking details → subquery is cleaner

---

### ✔ 2. You want a single aggregated value

Example:

```sql
SELECT full_name
FROM Users
WHERE user_id = (
    SELECT user_id
    FROM Bookings
    GROUP BY user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);
```

---

### ✔ 3. Readability is more important than performance

Subqueries are often easier to understand for beginners.

---

## 7. When JOIN is better than Subquery?

Use JOIN when:

### ✔ 1. You need data from multiple tables

Example:

* User details + booking details together

### ✔ 2. Performance matters

JOIN is usually faster in large datasets.

### ✔ 3. You need complex reporting

Example dashboards, analytics, aggregation

---

## 8. Common Interview Questions + Answers

### Q1: What is a subquery in SQL?

**Answer:**
A subquery is a query inside another query that provides intermediate results to the main query.

---

### Q2: Can a subquery return multiple rows?

**Answer:**
Yes, depending on the operator:

* `IN` → multiple rows
* `=` → single value only
* `EXISTS` → checks existence

---

### Q3: What is a correlated subquery?

**Answer:**
A correlated subquery depends on values from the outer query and runs once per row.

---

### Q4: Subquery vs JOIN — which is faster?

**Answer:**
JOIN is generally faster because databases optimize joins better than nested queries.

---

### Q5: Can we always replace JOIN with subquery?

**Answer:**
No. Some queries are more efficient or only possible using JOIN, especially when combining multiple tables.

---

### Q6: Why use subquery instead of JOIN?

**Answer:**

* Better readability
* Easier filtering logic
* When only existence or condition check is needed

---

## 9. Interview Tip (Very Important)

When answering in viva:

👉 Always mention:

* "Subquery executes first"
* "Used for filtering or intermediate results"
* "JOIN is for combining datasets"

This shows conceptual clarity.

---

## 10. One-Line Summary

> A subquery is a query inside another query used for filtering or intermediate computation, while a JOIN combines rows from multiple tables for a unified result.

