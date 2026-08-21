# 🛠️ Student Portal Developer & Implementation Guide

This guide is designed for developers working on the **Saylani Bootcamp LMS Student Portal** to extend, customize, or connect new features seamlessly.

---

## 🧭 Step-by-Step Implementation Workflow

When adding or customizing a feature (e.g., adding a new page or widget):

### 1. Register Backend Endpoints
Add the new endpoint path in `src/constants/apiEndpoints.js`:
```javascript
export const ENDPOINTS = {
  // ...
  NOTIFICATIONS: {
    GET_ALL: "/student-portal/notifications",
    MARK_READ: (id) => `/student-portal/notifications/${id}/read`,
  },
};
```

### 2. Create Service Function
Add data fetching logic in `src/services/` using the pre-configured `axiosClient`:
```javascript
import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const notificationService = {
  getNotifications: async () => {
    return await axiosClient.get(ENDPOINTS.NOTIFICATIONS.GET_ALL);
  },
};
```

### 3. Build UI Components Using Design System Tokens
Always leverage atomic components from `src/components/common/` (`Card`, `Button`, `Badge`, `Modal`, `Input`, `StatCard`):
```jsx
import React from "react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";

export const NotificationItem = ({ item }) => {
  return (
    <div className="p-3 rounded-lg bg-[var(--color-surface-low)] border border-[var(--color-border-subtle)]">
      <h4 className="text-sm font-semibold text-[var(--color-text)]">{item.title}</h4>
      <p className="text-xs text-[var(--color-text-muted)]">{item.message}</p>
    </div>
  );
};
```

### 4. Create Page & Connect via Route
Add the page view under `src/pages/` and register in `src/routes/AppRoutes.jsx`:
```jsx
<Route path="notifications" element={<Notifications />} />
```

---

## 🎯 Code Quality & Standards Checklist
- ✅ **No inline hex colors**: Use `var(--color-...)` tokens.
- ✅ **No hardcoded API URLs**: Use `src/constants/apiEndpoints.js`.
- ✅ **Clean imports**: Use barrel exports (`src/components/common`, `src/services`, `src/hooks`).
- ✅ **Responsive Design**: Ensure mobile-friendliness with Tailwind responsive breakpoints (`sm:`, `md:`, `lg:`).
- ✅ **Graceful States**: Always handle `loading`, `error`, and `empty` states with `Spinner` and `EmptyState` components.
