# 🎓 Saylani Bootcamp LMS — Student Portal Upgrade & Architecture Guide

A complete, end-to-end technical blueprint for adding **Student Authentication** and the **Student Portal** to the Saylani Bootcamp LMS.

---

## 📑 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Database Schema Upgrades (Models & Fields)](#2-database-schema-upgrades-models--fields)
3. [Required Libraries & Dependencies](#3-required-libraries--dependencies)
4. [Backend Directory Structure & New Files](#4-backend-directory-structure--new-files)
5. [Authentication & RBAC Middleware Flow](#5-authentication--rbac-middleware-flow)
6. [Detailed API Endpoints Specifications](#6-detailed-api-endpoints-specifications)
7. [Step-by-Step Backend Implementation Guide](#7-step-by-step-backend-implementation-guide)
8. [Frontend Student Portal UI & Routing Plan](#8-frontend-student-portal-ui--routing-plan)
9. [Student Viva Defense & Technical Questions](#9-student-viva-defense--technical-questions)

---

## 1. Architecture Overview

Currently, the Saylani LMS operates in single-actor mode where only the **Admin** logs in to manage students, attendance, tasks, teams, and projects.

```
                    ┌─────────────────────────────────────────┐
                    │               User Request              │
                    └────────────────────┬────────────────────┘
                                         │
                         ┌───────────────┴───────────────┐
                         │                               │
                         ▼                               ▼
               [ Role: "admin" ]               [ Role: "student" ]
                         │                               │
                         ▼                               ▼
              ┌─────────────────────┐         ┌─────────────────────┐
              │    Admin Portal     │         │   Student Portal    │
              │  (Full System CRUD) │         │ (Personalized View) │
              └──────────┬──────────┘         └──────────┬──────────┘
                         │                               │
                         ▼                               ▼
                 /api/admin/*                   /api/student-auth/*
                 /api/student/* (admin)         /api/student-portal/*
                 /api/attendance/*              - /dashboard
                 /api/teams/*                   - /attendance
                 /api/tasks/*                   - /team & /project
                 /api/projects/*                - /tasks & /submit
                                                - /profile
```

---

## 2. Database Schema Upgrades (Models & Fields)

### 2.1 `Student` Model (`Server/models/student.Model.js`)

Add fields to support password hashing, authentication, and richer student profiles:

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
    // Identification
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false // Excluded from find() queries by default for security
    },
    role: {
        type: String,
        enum: ["student"],
        default: "student"
    },

    // Academic Details
    course: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    },

    // Contact & Social Profiles
    phone: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    githubProfile: {
        type: String,
        default: ""
    },
    linkedinProfile: {
        type: String,
        default: ""
    },

    // Account State & Security
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    isAccountActive: {
        type: Boolean,
        default: true
    },
    tokenVersion: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Automatic Password Hashing Middleware
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Helper Method to compare password
studentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
export default Student;
```

---

### 2.2 `Task` Model (`Server/models/taskModel.js`)

Enhance the task schema to support student submissions and grading feedback:

```javascript
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "Student ID is required"],
        index: true
    },
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "submitted", "completed"],
        default: "pending"
    },
    
    // [NEW] Student Submission Fields
    submissionUrl: {
        type: String,
        default: "" // GitHub PR, Live Link, etc.
    },
    submissionNote: {
        type: String,
        default: ""
    },
    submittedAt: {
        type: Date,
        default: null
    },
    
    // [NEW] Instructor Review
    feedback: {
        type: String,
        default: ""
    },
    grade: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
```

---

### 2.3 `Project` Model (`Server/models/project.Model.js`)

Add submission URLs for teams to showcase their group projects:

```javascript
// New fields to add inside projectSchema:
githubRepoUrl: {
    type: String,
    default: ""
},
liveDeploymentUrl: {
    type: String,
    default: ""
},
documentationUrl: {
    type: String,
    default: ""
}
```

---

## 3. Required Libraries & Dependencies

Your backend `package.json` already contains all core dependencies needed:
- `bcrypt` (`^6.0.0`): For cryptographic password hashing (salt rounds: 10).
- `jsonwebtoken` (`^9.0.3`): For issuing signed JWT tokens with `{ id, role, tokenVersion }`.
- `mongoose` (`^8.3.2`): For MongoDB schema definitions, virtuals, and aggregation pipelines.
- `cors` & `express`: For cross-origin handling and routing.

---

## 4. Backend Directory Structure & New Files

```
Server/
├── controllers/
│   ├── admin.controller.js
│   ├── attendance.controller.js
│   ├── dashboard.controller.js
│   ├── project.controller.js
│   ├── student.controller.js
│   ├── studentAuth.controller.js       ✨ [NEW] Student Login, Profile, Password
│   ├── studentPortal.controller.js     ✨ [NEW] Student Dashboard, Attendance, Tasks
│   ├── task.controller.js
│   └── team.controller.js
│
├── services/
│   ├── admin.Service.js
│   ├── attendance.Service.js
│   ├── dashboard.Service.js
│   ├── project.Service.js
│   ├── student.Service.js
│   ├── studentAuth.Service.js          ✨ [NEW] Auth logic, JWT issuance
│   ├── studentPortal.Service.js        ✨ [NEW] Scoped data queries & stats
│   ├── task.Service.js
│   └── team.Service.js
│
├── routes/
│   ├── admin.Routes.js
│   ├── attendance.Routes.js
│   ├── dashboard.Routes.js
│   ├── project.Routes.js
│   ├── student.Routes.js               (Admin CRUD on students)
│   ├── studentAuth.Routes.js           ✨ [NEW] /api/student-auth/*
│   ├── studentPortal.Routes.js         ✨ [NEW] /api/student-portal/*
│   ├── task.Routes.js
│   └── team.Routes.js
│
├── middleware/
│   └── auth.middleware.js              ⚡ [REFACTOR] Unified protect & RBAC
│
└── app.js                              ⚡ [REFACTOR] Proper route-level protections
```

---

## 5. Authentication & RBAC Middleware Flow

Refactor `Server/middleware/auth.middleware.js` to handle both roles cleanly:

```javascript
import jwt from "jsonwebtoken";
import Admin from "../models/admin.Model.js";
import Student from "../models/student.Model.js";

// 1. Generic Authentication Middleware
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user;
        if (decoded.role === "admin") {
            user = await Admin.findById(decoded.adminId || decoded.id);
        } else if (decoded.role === "student") {
            user = await Student.findById(decoded.studentId || decoded.id);
            if (user && !user.isAccountActive) {
                return res.status(403).json({ message: "Account has been deactivated" });
            }
        }

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Invalidate tokens if tokenVersion has incremented (e.g. after password reset)
        if (decoded.tokenVersion !== user.tokenVersion) {
            return res.status(401).json({ message: "Session expired, please login again" });
        }

        // Attach user info to request
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: decoded.role,
            ...(decoded.role === "student" && { rollNumber: user.rollNumber, course: user.course, batch: user.batch, team_id: user.team_id })
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// 2. Role-Based Access Control Middleware
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Requires one of the following roles: [${allowedRoles.join(", ")}]`
            });
        }
        next();
    };
};

// Convenience shortcuts:
export const protectAdmin = [protect, authorizeRoles("admin")];
export const protectStudent = [protect, authorizeRoles("student")];
```

---

## 6. Detailed API Endpoints Specifications

### 6.1 Student Authentication API (`/api/student-auth`)

| Method | Endpoint | Protection | Payload | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/login` | Public | `{ identifier, password }` | Login with either Roll Number or Email |
| `GET` | `/me` | `protectStudent` | *None* | Returns current authenticated student profile |
| `PUT` | `/update-password` | `protectStudent` | `{ currentPassword, newPassword }` | Updates student password and bumps `tokenVersion` |
| `PUT` | `/profile` | `protectStudent` | `{ phone, avatar, githubProfile, linkedinProfile }` | Updates student editable profile attributes |

---

### 6.2 Student Portal Data API (`/api/student-portal`)

| Method | Endpoint | Protection | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/dashboard` | `protectStudent` | Returns summary cards: attendance stats, team info, task counts, active project info |
| `GET` | `/attendance` | `protectStudent` | Returns attendance records filtered for this student only (`?month=08&year=2026`) |
| `GET` | `/team` | `protectStudent` | Returns current team details, project details, and populated team members |
| `GET` | `/tasks` | `protectStudent` | Returns all tasks assigned to the student with status filters |
| `PUT` | `/tasks/:id/submit` | `protectStudent` | Submit task: updates status to `submitted`, attaches `submissionUrl`, `submissionNote` |
| `GET` | `/project` | `protectStudent` | Returns the assigned team project instructions, timeline, and deliverables |

---

## 7. Step-by-Step Backend Implementation Guide

### Step 1: Update `app.js` Route Registrations
Ensure routes are registered with their respective granular protections:

```javascript
// Admin Authentication (Public)
app.use("/api/admin", adminRouter);

// Student Authentication (Public Login, Protected Me/Password)
app.use("/api/student-auth", studentAuthRoutes);

// Admin-Only Modules (Protected with protectAdmin)
app.use("/api/student", protectAdmin, studentRoutes);
app.use("/api/tasks", protectAdmin, taskRoutes);
app.use("/api/teams", protectAdmin, teamRoutes);
app.use("/api/projects", protectAdmin, projectRoutes);
app.use("/api/attendance", protectAdmin, attendanceRoutes);
app.use("/api/dashboard", protectAdmin, dashboardRouter);

// Student Portal Module (Protected with protectStudent)
app.use("/api/student-portal", protectStudent, studentPortalRoutes);
```

---

### Step 2: Student Login Service Logic (`Server/services/studentAuth.Service.js`)

```javascript
import Student from "../models/student.Model.js";
import jwt from "jsonwebtoken";

export const loginStudent = async (identifier, password) => {
    // 1. Allow login via either rollNumber or email
    const student = await Student.findOne({
        $or: [
            { rollNumber: identifier },
            { email: identifier.toLowerCase() }
        ]
    }).select("+password");

    if (!student) {
        throw new Error("Invalid Roll Number/Email or Password");
    }

    if (!student.isAccountActive) {
        throw new Error("Your account has been deactivated. Please contact the coordinator.");
    }

    // 2. Validate Password
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid Roll Number/Email or Password");
    }

    // 3. Generate JWT Token
    const token = jwt.sign(
        {
            studentId: student._id,
            role: "student",
            tokenVersion: student.tokenVersion
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        student: {
            id: student._id,
            name: student.name,
            rollNumber: student.rollNumber,
            email: student.email,
            course: student.course,
            batch: student.batch,
            team_id: student.team_id,
            isFirstLogin: student.isFirstLogin,
            avatar: student.avatar,
            role: "student"
        }
    };
};
```

---

### Step 3: Student Portal Aggregated Dashboard Service (`Server/services/studentPortal.Service.js`)

```javascript
import Attendance from "../models/attendence.Model.js";
import { Team } from "../models/team.Model.js";
import { Task } from "../models/taskModel.js";
import Student from "../models/student.Model.js";

export const getStudentDashboardData = async (studentId) => {
    // 1. Attendance Metrics
    const attendanceRecords = await Attendance.find({ student_id: studentId });
    const totalClasses = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(r => r.status === "Present").length;
    const absentCount = attendanceRecords.filter(r => r.status === "Absent").length;
    const leaveCount = attendanceRecords.filter(r => r.status === "Leave").length;
    const attendancePercentage = totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(1) : 0;

    // 2. Task Metrics
    const tasks = await Task.find({ studentId }).sort({ dueDate: 1 });
    const taskSummary = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === "pending").length,
        inProgress: tasks.filter(t => t.status === "in_progress").length,
        completed: tasks.filter(t => t.status === "completed" || t.status === "submitted").length,
        upcomingTasks: tasks.filter(t => t.status !== "completed").slice(0, 3)
    };

    // 3. Team & Project Details
    const student = await Student.findById(studentId).populate("team_id");
    let teamData = null;
    if (student.team_id) {
        teamData = await Team.findById(student.team_id)
            .populate("members", "name rollNumber avatar email")
            .populate("projectId");
    }

    return {
        studentInfo: {
            id: student._id,
            name: student.name,
            rollNumber: student.rollNumber,
            course: student.course,
            batch: student.batch
        },
        attendance: {
            totalClasses,
            presentCount,
            absentCount,
            leaveCount,
            percentage: `${attendancePercentage}%`
        },
        tasks: taskSummary,
        team: teamData
    };
};
```

---

## 8. Frontend Student Portal UI & Routing Plan

### 8.1 Dual-Login UI
- In `Client/src/pages/login/login.jsx`, add an interactive tab selector:
  - **"Admin Portal"** -> inputs: Email, Password -> calls `loginAdmin()` -> navigates to `/dashboard`
  - **"Student Portal"** -> inputs: Roll Number / Email, Password -> calls `loginStudent()` -> navigates to `/student/dashboard`

### 8.2 Student Layout & Pages
Create a dedicated `StudentLayout.jsx` with a student-focused sidebar/topbar:
1. `pages/student/StudentDashboard.jsx`: Metric cards, attendance donut chart, upcoming tasks, assigned team card.
2. `pages/student/StudentAttendance.jsx`: Calendar/List view of all class attendances with status badges.
3. `pages/student/StudentTeam.jsx`: Teammates list, team project description, project github link submission.
4. `pages/student/StudentTasks.jsx`: Interactive kanban or task list with "Submit Task" modal (URL + notes).
5. `pages/student/StudentProfile.jsx`: Profile overview, social link editors, password changer.

---

## 9. Student Viva Defense & Technical Questions

### Q1: Why use separate routes (`/api/student-portal`) instead of reusing admin endpoints?
> **Answer:** **Principle of Least Privilege & Zero Trust.** Reusing admin endpoints requires dangerous conditional logic inside controllers. Dedicated student endpoints guarantee queries are strictly scoped to `req.user.id`, eliminating data leak vulnerabilities where a student could tamper with an ID parameter to view or edit another student's records.

### Q2: Why store `tokenVersion` in the Student/Admin schema?
> **Answer:** JWTs are stateless by nature and cannot be invalidated until their expiration timestamp. By checking `decoded.tokenVersion === user.tokenVersion` on every protected request, we can instantly invalidate all active sessions upon password reset or admin ban simply by incrementing `tokenVersion` in the database.

### Q3: Why is `password` configured with `select: false` in Mongoose?
> **Answer:** It prevents sensitive password hashes from accidentally leaking in regular queries like `Student.find()` or `Student.populate()`, ensuring password hashes are only retrieved when explicitly requested with `.select("+password")` during the login authentication phase.

---

*Saylani Bootcamp LMS — Engineered for Scalability & Security.*
