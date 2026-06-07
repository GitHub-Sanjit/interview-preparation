# Convex Database (Interview Preparation Guide)

## 1. Introduction

Convex is a modern backend-as-a-service (BaaS) and reactive database platform provided by **Convex (:contentReference[oaicite:0]{index=0})**.

It combines:

- Database
- Backend server functions
- Real-time data synchronization
- Type-safe API layer

Instead of building REST APIs or managing backend servers, developers write **queries and mutations directly in TypeScript**, and Convex handles execution, scaling, and reactivity.

---

## 2. Core Architecture

Convex follows a **serverless reactive architecture**:

### Components:

1. **Client (Frontend)**
   - React / Next.js app
   - Uses generated Convex hooks

2. **Convex Backend**
   - Runs functions (query/mutation/action)
   - Handles business logic

3. **Storage Layer**
   - Document-based database
   - Indexed collections

4. **Reactive Engine**
   - Tracks dependencies of queries
   - Automatically re-runs queries when data changes

---

## 3. Key Concepts

### 3.1 Queries

- Read-only operations
- Automatically reactive
- Re-run when underlying data changes

```ts
export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});
```

---

### 3.2 Mutations

- Used for writing data
- Insert, update, delete operations

```ts
export const sendMessage = mutation({
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      text: args.text,
      createdAt: Date.now(),
    });
  },
});
```

---

### 3.3 Actions

- Used for external operations
- API calls, email sending, third-party services
- Not reactive

```ts
export const callAPI = action({
  handler: async () => {
    const res = await fetch("https://api.example.com/data");
    return res.json();
  },
});
```

---

## 4. Data Model

Convex uses a **document-based schema system**.

### Example schema:

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    text: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }),
});
```

### Key points:

- No strict relational joins
- Uses references via IDs
- Schema validation built-in

---

## 5. Reactivity Model (Important for Interviews)

Convex is **reactive by default**:

### How it works:

1. Query runs → Convex tracks accessed data
2. Data changes in DB
3. Convex invalidates affected queries
4. UI automatically updates

### Benefit:

- No manual polling
- No WebSocket setup
- Real-time UI out of the box

---

## 6. Indexing

Indexes are required for efficient queries.

```ts
messages: defineTable({
  text: v.string(),
  userId: v.string(),
}).index("by_user", ["userId"]);
```

### Why indexing matters:

- Prevents full table scans
- Required for filtered queries
- Improves performance significantly

---

## 7. Authentication & Security

Convex integrates with auth providers like Clerk or custom auth.

### Security model:

- Every function receives `ctx.auth`
- You manually enforce access rules

```ts
if (ctx.auth.userId !== args.userId) {
  throw new Error("Unauthorized");
}
```

---

## 8. Convex vs Traditional Backend

| Feature     | Convex     | Traditional Backend       |
| ----------- | ---------- | ------------------------- |
| API Layer   | Built-in   | Manual (REST/GraphQL)     |
| Real-time   | Automatic  | WebSockets required       |
| Database    | Integrated | External (Postgres/Mongo) |
| Type Safety | End-to-end | Partial                   |
| Scaling     | Managed    | Manual setup              |

---

## 9. Convex vs Firebase vs Supabase

### Convex vs Firebase

- Convex: TypeScript-first, server functions
- Firebase: NoSQL, less structured backend logic

### Convex vs Supabase

- Convex: Reactive system, no SQL
- Supabase: PostgreSQL-based, SQL support

---

## 10. Advantages

- Real-time by default
- No backend infrastructure management
- Full TypeScript support
- Simple mental model
- Fast development speed

---

## 11. Limitations

- Not SQL-based (no joins like PostgreSQL)
- Smaller ecosystem than Firebase/Supabase
- Less suitable for heavy analytics
- Vendor lock-in risk

---

## 12. Common Interview Questions

### Q1: What is Convex?

Convex is a reactive backend-as-a-service platform that combines database, backend functions, and real-time synchronization.

---

### Q2: What is the difference between query and mutation?

- Query: Read-only, reactive
- Mutation: Writes data, not reactive

---

### Q3: How does Convex achieve real-time updates?

It tracks dependencies of queries and automatically re-runs them when related data changes.

---

### Q4: Does Convex support SQL?

No. It uses a document-based model with indexed queries.

---

### Q5: What are actions in Convex?

Actions are used for external side effects like API calls and are not reactive.

---

### Q6: Why do we need indexes?

Indexes optimize query performance and are required for filtering data efficiently.

---

## 13. System Design Perspective

If asked in interviews:

Convex is ideal for:

- Real-time chat apps
- Collaborative tools
- Dashboards
- SaaS MVPs

Architecture:
Frontend → Convex Functions → Reactive DB → Auto-updating UI

---

## 14. Example Use Case: Chat App

- `messages` table stores chat messages
- `sendMessage` mutation inserts message
- `getMessages` query auto-updates UI
- No WebSocket needed

---

## 15. Key Takeaway

Convex simplifies backend development by merging:

- Database
- API layer
- Real-time engine

into a single reactive system optimized for modern web applications.
