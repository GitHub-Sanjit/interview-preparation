# Question 3: Why Can't a Primary Key Contain NULL Values?

## 🎯 Interview Question

**Question:**

> If a Primary Key column guarantees that all row entries are completely unique, why does the database system also explicitly forbid it from containing a NULL value?

---

# 1. Short Interview Answer (30–45 Seconds)

A Primary Key is designed to uniquely identify each row in a table. While uniqueness ensures that no two rows have the same identifier, uniqueness alone is not sufficient. A Primary Key must also be **NOT NULL** because every record must have a known and identifiable value. Since **NULL represents an unknown or missing value**, allowing NULL would mean some rows could not be uniquely identified. Therefore, database systems automatically enforce both **UNIQUE** and **NOT NULL** constraints on Primary Keys to maintain entity integrity.

---

# 2. Understanding Primary Keys

A **Primary Key** is a column or a combination of columns that uniquely identifies each row in a table.

It has two essential properties:

## 1. Uniqueness

Every Primary Key value must be different.

Example:

| user_id |
| ------- |
| 1       |
| 2       |
| 3       |

No duplicate values are allowed.

---

## 2. Non-Nullability

Every row must contain a valid Primary Key value.

Example:

| user_id |
| ------- |
| 1       |
| 2       |
| NULL ❌  |

NULL values are prohibited.

---

# 3. Why Isn't Uniqueness Alone Enough?

Many people think:

> "If NULL is unique, why not allow it?"

The answer lies in what **NULL actually means**.

NULL does **not** mean zero.

NULL does **not** mean empty.

NULL means:

> "The value is unknown or missing."

A Primary Key's purpose is:

> To uniquely identify every row.

If a row contains NULL as its Primary Key, the database cannot determine the identity of that row.

For example:

| user_id | full_name |
| ------- | --------- |
| 1       | Alice     |
| 2       | Bob       |
| NULL    | Charlie   |

Question:

Which user is Charlie?

Answer:

The system cannot reliably identify the record because the identifier is unknown.

Therefore:

> A row without an identifier defeats the purpose of having a Primary Key.

---

# 4. Entity Integrity Rule

Database systems follow the **Entity Integrity Rule**.

## Definition

> Every table must have a Primary Key, and no component of that Primary Key can contain NULL values.

Why?

Because entities (rows) must always be identifiable.

Without this rule:

* Records could lose their identity.
* Relationships between tables could become unreliable.
* Data consistency would suffer.

---

# 5. Real-World Example: Football Ticket Booking System

Consider the Users table:

```sql
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100)
);
```

Example data:

| user_id | full_name  |
| ------- | ---------- |
| 1       | John Smith |
| 2       | Maria Khan |
| 3       | David Lee  |

Every user has a unique identifier.

---

Suppose NULL were allowed:

| user_id | full_name  |
| ------- | ---------- |
| 1       | John Smith |
| NULL    | Maria Khan |
| 3       | David Lee  |

Problems arise immediately:

* Which user is Maria?
* How would another table reference Maria?
* How would updates target the correct row?
* How would bookings be associated with this user?

The database would lose the ability to uniquely identify the record.

---

# 6. Relationship with Foreign Keys

Foreign Keys reference Primary Keys.

Example:

```text
Users (Parent)
    user_id (PK)
        ↓
Bookings (FK)
    user_id
```

Suppose Users contains:

| user_id |
| ------- |
| NULL    |

How would Bookings reference this user?

```sql
INSERT INTO Bookings(user_id)
VALUES (?);
```

What value should replace the question mark?

Since NULL means "unknown," the relationship becomes meaningless.

Therefore:

> Primary Keys cannot be NULL because other tables depend on them to establish valid relationships.

---

# 7. Why UNIQUE Constraints Allow NULL (Usually)

This is a very common interview question.

Consider:

```sql
email VARCHAR(100) UNIQUE
```

Most database systems allow:

| email                                 |
| ------------------------------------- |
| [abc@gmail.com](mailto:abc@gmail.com) |
| NULL                                  |
| NULL                                  |

because NULL means:

> "Unknown value"

Two unknown values are not considered equal.

However, Primary Keys follow stricter rules.

Primary Key = UNIQUE + NOT NULL

Therefore:

| Constraint  | Allows NULL? |
| ----------- | ------------ |
| UNIQUE      | Usually Yes  |
| PRIMARY KEY | No           |

---

# 8. Technical Explanation

A Primary Key enforces two constraints automatically:

```text
PRIMARY KEY
      =
UNIQUE + NOT NULL
```

When you write:

```sql
user_id INTEGER PRIMARY KEY
```

The database internally treats it as:

```sql
user_id INTEGER NOT NULL UNIQUE
```

This ensures:

✓ No duplicates.

✓ No missing identifiers.

---

# 9. What Problems Would Occur If NULL Were Allowed?

## Problem 1: Loss of Entity Identification

Rows could not be uniquely identified.

Example:

| employee_id |
| ----------- |
| NULL        |
| NULL        |

Which employee is which?

Impossible to determine.

---

## Problem 2: Broken Relationships

Foreign Keys would struggle to reference unknown records.

---

## Problem 3: Data Integrity Issues

Updates and deletions could target incorrect records.

Example:

```sql
UPDATE Users
SET email = 'new@email.com'
WHERE user_id = NULL;
```

This does not work as expected because:

```sql
NULL = NULL
```

does not evaluate to TRUE.

---

## Problem 4: Business Logic Failures

Systems relying on identifiers would break.

Examples:

* Ticket booking systems
* Banking systems
* Hospital databases
* Inventory systems

---

# 10. Interview Questions and Answers

## Q1: Why can't a Primary Key contain NULL values?

### Answer:

A Primary Key cannot contain NULL values because its purpose is to uniquely identify every row in a table. Since NULL represents an unknown or missing value, a row with a NULL Primary Key would not have a definite identity, violating entity integrity.

---

## Q2: Isn't uniqueness enough for a Primary Key?

### Answer:

No. Uniqueness prevents duplicates, but every record must also have a known identifier. Therefore, Primary Keys require both UNIQUE and NOT NULL constraints.

---

## Q3: What does NULL mean in SQL?

### Answer:

NULL represents missing, unknown, or undefined data. It is not equivalent to zero, an empty string, or FALSE.

---

## Q4: What is Entity Integrity?

### Answer:

Entity Integrity is the rule stating that every table must have a Primary Key, and Primary Key values cannot be NULL because every row must be uniquely identifiable.

---

## Q5: How is PRIMARY KEY different from UNIQUE?

### Answer:

A PRIMARY KEY automatically enforces both UNIQUE and NOT NULL constraints, whereas a UNIQUE constraint only enforces uniqueness and generally allows NULL values.

---

## Q6: Can a table have multiple Primary Keys?

### Answer:

No. A table can have only one Primary Key. However, that Primary Key may consist of multiple columns, known as a Composite Primary Key.

---

## Q7: Can a Composite Primary Key contain NULL values?

### Answer:

No. None of the columns participating in a Composite Primary Key can contain NULL values.

---

## Q8: Why are Primary Keys important for Foreign Keys?

### Answer:

Foreign Keys reference Primary Keys to establish relationships between tables. If Primary Keys contained NULL values, these relationships would become unreliable and compromise referential integrity.

---

# 11. Ideal Viva Answer (45–60 Seconds)

"A Primary Key cannot contain NULL values because its purpose is to uniquely identify each row in a table. Although uniqueness prevents duplicate values, every record must also have a known identifier. Since NULL represents an unknown or missing value, allowing NULL in a Primary Key would mean some records could not be identified reliably. This violates the Entity Integrity Rule and could lead to broken relationships with Foreign Keys. Therefore, database systems automatically enforce both UNIQUE and NOT NULL constraints on Primary Keys."

---

# 12. Keywords to Mention During Viva

✓ Primary Key

✓ Unique Identifier

✓ NOT NULL Constraint

✓ Entity Integrity

✓ Referential Integrity

✓ Foreign Key Relationships

✓ Known Identifier

✓ Database Consistency

✓ UNIQUE vs PRIMARY KEY

✓ NULL Represents Unknown Data

---

# 13. One-Line Summary

> A Primary Key cannot contain NULL values because every row in a database table must have a known and unique identifier to maintain entity integrity and support reliable relationships between tables.
