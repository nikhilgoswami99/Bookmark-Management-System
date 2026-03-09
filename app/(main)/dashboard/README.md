# 🐛 Bug Fix: `useSearchParams()` Suspense Boundary Error on `/dashboard`

## Overview

This document details a **Next.js production build failure** that occurred during Vercel deployment. The error caused the entire build to exit with code `1`, preventing the application from being deployed.

---

## ❌ The Error

```
⨯ useSearchParams() should be wrapped in a suspense boundary at page "/dashboard".
Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

Error occurred prerendering page "/dashboard".
Read more: https://nextjs.org/docs/messages/prerender-error

Export encountered an error on /(main)/dashboard/page: /dashboard, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
Error: Command "npm run build" exited with 1
```

---

## 🔍 Root Cause

### What the code looked like (broken)

**`app/(main)/dashboard/page.tsx`**

```tsx
"use client"; // ← This was at the TOP of the file

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
// ...other imports

function DashboardContent() {
  const searchParams = useSearchParams(); // ← useSearchParams used here
  // ...component logic
}

export default function Home() {
  return (
    // Suspense was here, but it didn't help — see explanation below
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
}
```

### Why it failed

The `"use client"` directive was placed at the **top of `page.tsx`**, making the **entire module** — including the exported `Home()` page function — a client component.

Next.js performs **static pre-rendering** at build time for every page. During this phase, it walks the server-side component tree. When it encounters a page whose **exported default function is itself a client component**, it cannot properly detect or honour the `<Suspense>` boundary wrapping `useSearchParams()`.

Even though `<Suspense>` was present inside `Home()`, Next.js's static generation engine saw:

```
Page export (Home) → Client Component → can't resolve Suspense at server level
```

Since `useSearchParams()` relies on runtime URL data, Next.js **requires** it to be inside a Suspense boundary that is visible from the **server component tree**, not just within the client component tree. When the page export itself is a client component, this guarantee cannot be made at build time, causing the prerender to fail.

### The misconception

It's a common misconception that simply wrapping with `<Suspense>` inside a `"use client"` file is sufficient. It is **not**. The Suspense boundary must exist **above** the `"use client"` boundary — i.e., it must live in a server component that renders the client component containing `useSearchParams()`.

---

## ✅ The Fix

The solution was to **split the file into two**:

1. **`page.tsx`** — A pure **Server Component** (no `"use client"`) that wraps the client content in `<Suspense>`.
2. **`DashboardContent.tsx`** — A **Client Component** (`"use client"`) that contains all hooks, state, and `useSearchParams()`.

---

### Fixed File 1: `app/(main)/dashboard/page.tsx`

```tsx
// NO "use client" — this is a Server Component
import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
import Loader from "@/components/loader/Loader";

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
}
```

> **Key point:** No `"use client"` directive. This file is a Server Component, so Next.js can see the `<Suspense>` boundary during static generation.

---

### Fixed File 2: `app/(main)/dashboard/DashboardContent.tsx`

```tsx
"use client"; // ← Moved here, to the actual client component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// ...other imports

export default function DashboardContent() {
  const searchParams = useSearchParams(); // ✅ Safe — wrapped by Suspense in page.tsx
  // ...all component logic
}
```

> **Key point:** `"use client"` is now scoped only to this component, which is safely wrapped by a server-level Suspense boundary.

---

## 📐 Architecture: Before vs. After

### Before (broken)

```
page.tsx  ["use client"]
  └── Home()                    ← Client Component (page export itself)
        └── <Suspense>          ← Inside client tree — NOT visible to server pre-renderer
              └── DashboardContent()
                    └── useSearchParams()  ← ❌ Causes build failure
```

### After (fixed)

```
page.tsx  [Server Component]
  └── DashboardPage()           ← Server Component (page export)
        └── <Suspense>          ← Visible to server pre-renderer ✅
              └── DashboardContent.tsx  ["use client"]
                    └── DashboardContent()
                          └── useSearchParams()  ← ✅ Safely wrapped
```

---

## 📋 Summary of Changes

| File                   | Before                                 | After                                                                    |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| `page.tsx`             | `"use client"` + all logic in one file | Pure Server Component — only renders `<Suspense>` + `<DashboardContent>` |
| `DashboardContent.tsx` | Did not exist                          | New Client Component with all hooks and logic                            |

---

## 📚 References

- [Next.js Docs: `missing-suspense-with-csr-bailout`](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
- [Next.js Docs: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Next.js Docs: `useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

---

## 💡 General Rule of Thumb

> If a component uses `useSearchParams()`, `usePathname()`, or any other navigation hook that reads runtime URL data, it **must** be a Client Component — and it **must** be rendered inside a `<Suspense>` boundary that lives in a **Server Component** parent.

```
✅ Correct pattern:

[Server Component] → <Suspense> → [Client Component using useSearchParams()]

❌ Wrong pattern:

["use client" file] → Home() → <Suspense> → DashboardContent using useSearchParams()
```
