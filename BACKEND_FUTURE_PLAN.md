# Backend Restructuring Plan (For Future Implementation)

This document details the precise changes required in the Node.js / Express backend to support a fully functional Student Portal.

## 1. Schema Modifications

### `models/student.Model.js`
**Current State:** Admins create students with basic info (Roll Number, Name, Email, Course). There is no way for a student to log in.
**Required Change:**
- Add a `password` field (String, required).
- Add a pre-save hook using `bcrypt` to hash the password before saving to the database.
- **Migration Strategy:** For existing students, write a script to set their default password to their `rollNumber` and hash it.

### `models/taskModel.js`
**Current State:** Tasks only track assignment (studentId, title, dueDate, status).
**Required Change:**
- Add `submissionLink`: `{ type: String, trim: true }`
- Add `submissionDescription`: `{ type: String, trim: true }`
- Add `submittedAt`: `{ type: Date }`
- Update `status` enum to definitively handle `['pending', 'in_progress', 'submitted', 'completed']`.

---

## 2. New Authentication Flow

### `routes/studentAuth.Routes.js`
Create a new route file dedicated to student authentication.
- **POST `/api/student-auth/login`**
  - **Body:** `{ "rollNumber": "12345", "password": "mypassword" }`
  - **Logic:** Find student by `rollNumber`. Compare hashed password. If valid, sign a JWT payload containing `studentId` and `role: "student"`.

### `middleware/auth.Middleware.js`
**Current State:** Only `protectAdmin` exists.
**Required Change:**
- Create `protectStudent` middleware to verify the student's JWT token and attach `req.student = decoded`.

---

## 3. New API Endpoints for Students

### Task Endpoints (`routes/task.Routes.js`)
Currently, tasks can be fetched, but we need a secure way for a student to submit *their own* tasks.

- **PUT `/api/tasks/:taskId/submit`**
  - **Middleware:** `protectStudent`
  - **Body:** `{ "submissionLink": "https://github.com/...", "submissionDescription": "..." }`
  - **Logic:**
    1. Find task by `taskId`.
    2. Ensure `task.studentId.toString() === req.student.id` (Security check so students can't submit other students' tasks).
    3. Update `submissionLink`, `submissionDescription`, `submittedAt = Date.now()`.
    4. Update `status = 'submitted'` (or `completed`).
    5. Save and return updated task.

### Profile Endpoints (`routes/student.Routes.js`)
- **GET `/api/student/me`**
  - **Middleware:** `protectStudent`
  - **Logic:** Return the currently logged-in student's profile (including populated Team info) based on `req.student.id`.

---

## 4. Admin Frontend Updates (Client)
Once the backend supports `submissionLink`, the Admin frontend (`Client/` directory) needs a UI update on the Task Review page to actually display the clickable `submissionLink` and `submissionDescription` so the admin can grade the student's work.
