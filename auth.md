# Authentication Implementation Guide

This document explains the simple, beginner-friendly approach used to implement authentication in **Sangrah**.

## 1. The Core Concept: Session-Based Authentication
Instead of using complex JWT tokens in local storage, we use **HTTP-only Cookies** and a **Session Database**. 

### Why this approach?
- **Secure**: Cookies with `httpOnly: true` cannot be accessed by hackers via JavaScript (XSS protection).
- **Persistent**: Users stay logged in even if they refresh the page or close the browser.
- **Controlled**: You can easily revoke a user's session from the database.

---

## 2. Backend Architecture (The API Routes)

### `POST /api/login`
1. Validates the email and password.
2. Creates a new `Session` document in MongoDB with a unique `sessionId`.
3. Sends back an **HTTP-only cookie** named `sessionID`.

### `GET /api/me` (New)
1. Reads the `sessionID` from the browser cookies.
2. Checks if that ID exists in the `Session` collection.
3. Returns the user's information (name, email, profile pic) to the frontend.

### `POST /api/logout` (New)
1. Finds the current `sessionID` in the database and **deletes it**.
2. Tells the browser to **clear the cookie**.

---

## 3. Frontend Architecture (The AuthContext)

The `AuthContext` acts as the "Global Brain" for authentication.

### State management
- `user`: Stores the current user object or `null`.
- `loading`: A boolean that tells us if we are still checking the session.

### The "Auto-Check" Logic
When the app first loads, we run a `useEffect` that calls `/api/me`. 
- If the API returns a user, we set `user` state.
- If it returns nothing (or an error), `user` stays `null`.
- Either way, we set `loading` to `false` so the UI knows it's safe to render.

### The `useAuth` Hook
Instead of importing `useContext` and `AuthContext` everywhere, you can simply use:
```tsx
const { user, logout, loading } = useAuth();
```

---

## 4. How to protect a page?
To prevent logged-out users from seeing a page, you can add this check at the top of your component:

```tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>; // Prevent "flicker"
  if (!user) return null; // Don't show anything while redirecting

  return <h1>Only logged-in users see this!</h1>;
}
```

---

## Summary of Files Modified/Created:
- `app/api/me/route.ts`: Fetches the current logged-in user.
- `app/api/logout/route.ts`: Clears session on the server.
- `context/AuthContext.tsx`: Manages global state and provides the `useAuth` hook.
- `app/layout.tsx`: Wrapped with `<AuthProvider>` to enable context everywhere.
