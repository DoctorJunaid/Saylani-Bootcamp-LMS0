# Saylani LMS API Documentation for Frontend Developers

Welcome to the **Saylani Bootcamp LMS API Documentation**. This document provides comprehensive information on all available backend API endpoints, authentication mechanisms, request/response formats, status codes, and code examples for frontend integration using Axios and Vanilla JavaScript / React.

---

## 📌 Base URL & Global Configuration

- **Base URL**: `http://localhost:9000/api`
- **Content Type**: `application/json`

---

## 🔒 Authentication & Authorization

All routes (except `/api/admin/login`) are protected by the `protectAdmin` middleware.

### How to Authenticate Requests
1. Send a `POST` request to `/api/admin/login` with admin credentials.
2. Store the returned `token` (e.g., in `localStorage` or state management).
3. Include the token in the `Authorization` header for all subsequent requests:
   ```http
   Authorization: Bearer <YOUR_JWT_TOKEN>
   ```

---

## 🚀 Axios Setup Example for Frontend

Create an `axios.js` file in your frontend codebase to handle base URLs and automatic token injection:

```javascript
// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or retrieve from auth state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

---

## 📚 API Endpoints Summary

| Module | Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `POST` | `/api/admin/login` | ❌ No | Admin login & JWT token generation |
| **Student** | `POST` | `/api/student` | 🔑 Yes | Create a new student |
| **Student** | `GET` | `/api/student` | 🔑 Yes | Get all students or search by name/rollNumber |
| **Student** | `GET` | `/api/student/:id` | 🔑 Yes | Get single student details |
| **Student** | `PUT` | `/api/student/:id` | 🔑 Yes | Update student details |
| **Student** | `DELETE` | `/api/student/:id` | 🔑 Yes | Delete a student |
| **Project** | `POST` | `/api/projects` | 🔑 Yes | Create a new project |
| **Project** | `GET` | `/api/projects` | 🔑 Yes | Get all projects |
| **Project** | `GET` | `/api/projects/:id` | 🔑 Yes | Get single project details |
| **Project** | `PUT` | `/api/projects/:id` | 🔑 Yes | Update project details |
| **Project** | `DELETE` | `/api/projects/:id` | 🔑 Yes | Delete a project |
| **Task** | `GET` | `/api/tasks` | 🔑 Yes | Get all tasks (populated with student info) |
| **Task** | `POST` | `/api/tasks` | 🔑 Yes | Create a new task |
| **Task** | `GET` | `/api/tasks/student/:studentId` | 🔑 Yes | Get all tasks assigned to a specific student |
| **Task** | `GET` | `/api/tasks/:id` | 🔑 Yes | Get single task details |
| **Task** | `PUT` | `/api/tasks/:id` | 🔑 Yes | Update task details / status |
| **Task** | `DELETE` | `/api/tasks/:id` | 🔑 Yes | Delete a task |
| **Team** | `GET` | `/api/teams` | 🔑 Yes | Get all teams (populated with member info) |
| **Team** | `GET` | `/api/teams/unassigned` | 🔑 Yes | Get teams with zero members |
| **Team** | `GET` | `/api/teams/unassigned-students` | 🔑 Yes | Get students not assigned to any team |
| **Team** | `GET` | `/api/teams/project/:projectId` | 🔑 Yes | Get team assigned to a specific project |
| **Team** | `POST` | `/api/teams` | 🔑 Yes | Create a new team |
| **Team** | `POST` | `/api/teams/:teamId/members/:studentId` | 🔑 Yes | Add a member to a team |
| **Team** | `DELETE` | `/api/teams/:teamId/members` | 🔑 Yes | Batch remove selected members from team |
| **Team** | `DELETE` | `/api/teams/:teamId/members/:studentId` | 🔑 Yes | Remove a single member from team |
| **Team** | `GET` | `/api/teams/:id` | 🔑 Yes | Get single team details |
| **Team** | `PUT` | `/api/teams/:id` | 🔑 Yes | Update team details |
| **Team** | `DELETE` | `/api/teams/:id` | 🔑 Yes | Delete a team |

---

## 📖 Detailed Module Endpoint Documentation

---

### 1. Admin Authentication Module (`/api/admin`)

#### 1.1 Admin Login
- **Endpoint**: `POST /api/admin/login`
- **Auth Required**: ❌ No
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Admin login Sucessfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbWRpbklkIjoiNjRmMDFh...",
    "amdin": {
      "id": "65123456789abcdef0123456",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```
  *(Note: The admin object key returned in the JSON payload is `amdin`)*
- **Error Responses**:
  - `400 Bad Request`: `{ "message": "Email and passowrd are requried!" }`
  - `401 Unauthorized`: `{ "erroMessage": "Invalid email or password" }`

- **Frontend Usage Example**:
  ```javascript
  import api from "./api/axios";

  export const loginAdmin = async (email, password) => {
    try {
      const response = await api.post("/admin/login", { email, password });
      const { token, amdin } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(amdin));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  ```

---

### 2. Student Management Module (`/api/student`)

#### 2.1 Create Student
- **Endpoint**: `POST /api/student`
- **Auth Required**: 🔑 Yes (`Authorization: Bearer <token>`)
- **Request Body**:
  ```json
  {
    "rollNumber": "102341",
    "name": "Muhammad Ali",
    "course": "Web & Mobile App Development",
    "batch": "Batch 10"
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "message": "Student Created successfully",
    "student": {
      "_id": "65123456789abcdef0123001",
      "rollNumber": "102341",
      "name": "Muhammad Ali",
      "course": "Web & Mobile App Development",
      "batch": "Batch 10",
      "team_id": null,
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T10:00:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - `500 Internal Server Error`: `{ "message": "All fields are requried" }` or `{ "message": "User already exists" }`

#### 2.2 Get All Students / Live Search
- **Endpoint**: `GET /api/student`
- **Auth Required**: 🔑 Yes
- **Query Parameters**:
  - `search` (optional): Filter students by student name (case-insensitive substring) or roll number (exact numeric match).
- **Example Requests**:
  - Get all: `GET /api/student`
  - Search by Name: `GET /api/student?search=Ali`
  - Search by Roll Number: `GET /api/student?search=102341`
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Students fetched Sucessfully",
    "students": [
      {
        "_id": "65123456789abcdef0123001",
        "rollNumber": "102341",
        "name": "Muhammad Ali",
        "course": "Web & Mobile App Development",
        "batch": "Batch 10",
        "team_id": null,
        "createdAt": "2026-08-11T10:00:00.000Z",
        "updatedAt": "2026-08-11T10:00:00.000Z"
      }
    ]
  }
  ```

#### 2.3 Get Single Student by ID
- **Endpoint**: `GET /api/student/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Student fetched sucessfully!",
    "student": {
      "_id": "65123456789abcdef0123001",
      "rollNumber": "102341",
      "name": "Muhammad Ali",
      "course": "Web & Mobile App Development",
      "batch": "Batch 10",
      "team_id": null,
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T10:00:00.000Z"
    }
  }
  ```

#### 2.4 Update Student
- **Endpoint**: `PUT /api/student/:id`
- **Auth Required**: 🔑 Yes
- **Request Body**: (Provide fields to update)
  ```json
  {
    "rollNumber": "102341",
    "name": "Muhammad Ali Khan",
    "course": "AI & Chatbot Development",
    "batch": "Batch 11"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Student Updated Sucessfully!",
    "student": {
      "_id": "65123456789abcdef0123001",
      "rollNumber": "102341",
      "name": "Muhammad Ali Khan",
      "course": "AI & Chatbot Development",
      "batch": "Batch 11",
      "team_id": null,
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T11:30:00.000Z"
    }
  }
  ```

#### 2.5 Delete Student
- **Endpoint**: `DELETE /api/student/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Student Deleted Sucessfully"
  }
  ```

- **Frontend Usage Examples**:
  ```javascript
  import api from "./api/axios";

  // Fetch all or search students
  export const fetchStudents = async (searchQuery = "") => {
    const url = searchQuery ? `/student?search=${encodeURIComponent(searchQuery)}` : "/student";
    const res = await api.get(url);
    return res.data.students;
  };

  // Create student
  export const createStudent = async (studentData) => {
    const res = await api.post("/student", studentData);
    return res.data;
  };

  // Update student
  export const updateStudent = async (id, studentData) => {
    const res = await api.put(`/student/${id}`, studentData);
    return res.data;
  };

  // Delete student
  export const deleteStudent = async (id) => {
    const res = await api.delete(`/student/${id}`);
    return res.data;
  };
  ```

---

### 3. Project Management Module (`/api/projects`)

#### 3.1 Create Project
- **Endpoint**: `POST /api/projects`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "title": "E-Commerce Mobile App",
    "teamId": "65123456789abcdef0123999",
    "description": "Full-stack mobile application built with React Native and Node.js",
    "dueDate": "2026-12-31T23:59:59.000Z",
    "status": "Not Started"
  }
  ```
  *(Status options: `"Not Started"`, `"In Progress"`, `"Completed"`. Default: `"Not Started"`)*
- **Success Response (`201 Created`)**:
  ```json
  {
    "message": "Project created successfully",
    "project": {
      "_id": "65123456789abcdef0123777",
      "title": "E-Commerce Mobile App",
      "teamId": "65123456789abcdef0123999",
      "description": "Full-stack mobile application built with React Native and Node.js",
      "dueDate": "2026-12-31T23:59:59.000Z",
      "status": "Not Started",
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T10:00:00.000Z"
    }
  }
  ```

#### 3.2 Get All Projects
- **Endpoint**: `GET /api/projects`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Projects fetched successfully",
    "projects": [
      {
        "_id": "65123456789abcdef0123777",
        "title": "E-Commerce Mobile App",
        "teamId": "65123456789abcdef0123999",
        "description": "Full-stack mobile application built with React Native and Node.js",
        "dueDate": "2026-12-31T23:59:59.000Z",
        "status": "Not Started",
        "createdAt": "2026-08-11T10:00:00.000Z",
        "updatedAt": "2026-08-11T10:00:00.000Z"
      }
    ]
  }
  ```

#### 3.3 Get Single Project by ID
- **Endpoint**: `GET /api/projects/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Project fetched successfully",
    "project": { ... }
  }
  ```

#### 3.4 Update Project
- **Endpoint**: `PUT /api/projects/:id`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "title": "Updated E-Commerce App",
    "status": "In Progress"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Project updated successfully",
    "project": { ... }
  }
  ```

#### 3.5 Delete Project
- **Endpoint**: `DELETE /api/projects/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "message": "Project deleted successfully",
    "project": { ... }
  }
  ```

---

### 4. Task Management Module (`/api/tasks`)

#### 4.1 Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "65123456789abcdef0123888",
        "studentId": {
          "_id": "65123456789abcdef0123001",
          "name": "Muhammad Ali",
          "rollNumber": "102341",
          "course": "Web Development",
          "batch": "Batch 10"
        },
        "title": "Setup Express Server",
        "description": "Initialize Node project and create basic routes",
        "dueDate": "2026-09-01T00:00:00.000Z",
        "status": "Pending",
        "createdAt": "2026-08-11T10:00:00.000Z",
        "updatedAt": "2026-08-11T10:00:00.000Z"
      }
    ]
  }
  ```

#### 4.2 Create Task
- **Endpoint**: `POST /api/tasks`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "studentId": "65123456789abcdef0123001",
    "title": "Setup Express Server",
    "description": "Initialize Node project and create basic routes",
    "dueDate": "2026-09-01T00:00:00.000Z",
    "status": "Pending"
  }
  ```
  *(Status options: `"Pending"`, `"In Progress"`, `"Completed"`. Default: `"Pending"`)*
- **Success Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "65123456789abcdef0123888",
      "studentId": "65123456789abcdef0123001",
      "title": "Setup Express Server",
      "description": "Initialize Node project and create basic routes",
      "dueDate": "2026-09-01T00:00:00.000Z",
      "status": "Pending",
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T10:00:00.000Z"
    }
  }
  ```
- **Error Response (`400 Bad Request`)**:
  ```json
  {
    "success": false,
    "message": "Student ID and task title are required"
  }
  ```

#### 4.3 Get Tasks by Student ID
- **Endpoint**: `GET /api/tasks/student/:studentId`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [ ... ]
  }
  ```

#### 4.4 Get Single Task by ID
- **Endpoint**: `GET /api/tasks/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### 4.5 Update Task
- **Endpoint**: `PUT /api/tasks/:id`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "status": "In Progress"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### 4.6 Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

---

### 5. Team Management Module (`/api/teams`)

#### 5.1 Get All Teams
- **Endpoint**: `GET /api/teams`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "65123456789abcdef0123999",
        "name": "Team Alpha",
        "projectId": "65123456789abcdef0123777",
        "members": [
          {
            "_id": "65123456789abcdef0123001",
            "rollNumber": "102341",
            "name": "Muhammad Ali",
            "course": "Web Development",
            "batch": "Batch 10"
          }
        ],
        "createdAt": "2026-08-11T10:00:00.000Z",
        "updatedAt": "2026-08-11T10:00:00.000Z"
      }
    ]
  }
  ```

#### 5.2 Get Unassigned Teams
- **Endpoint**: `GET /api/teams/unassigned`
- **Description**: Returns all teams that currently have 0 members.
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [ ... ]
  }
  ```

#### 5.3 Get Unassigned Students
- **Endpoint**: `GET /api/teams/unassigned-students`
- **Description**: Returns all students who are not assigned to any team.
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [ ... ]
  }
  ```

#### 5.4 Get Team by Project ID
- **Endpoint**: `GET /api/teams/project/:projectId`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### 5.5 Create Team
- **Endpoint**: `POST /api/teams`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "name": "Team Alpha",
    "projectId": "65123456789abcdef0123777",
    "members": ["65123456789abcdef0123001"]
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "65123456789abcdef0123999",
      "name": "Team Alpha",
      "projectId": "65123456789abcdef0123777",
      "members": ["65123456789abcdef0123001"],
      "createdAt": "2026-08-11T10:00:00.000Z",
      "updatedAt": "2026-08-11T10:00:00.000Z"
    }
  }
  ```

#### 5.6 Add Member to Team
- **Endpoint**: `POST /api/teams/:teamId/members/:studentId`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{ "success": false, "message": "Student is already a member of this team" }`
  - `400 Bad Request`: `{ "success": false, "message": "Student is already assigned to another team" }`

#### 5.7 Remove Selected Members from Team (Batch Delete)
- **Endpoint**: `DELETE /api/teams/:teamId/members`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "studentIds": ["65123456789abcdef0123001", "65123456789abcdef0123002"]
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### 5.8 Remove Single Member from Team
- **Endpoint**: `DELETE /api/teams/:teamId/members/:studentId`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

#### 5.9 Get Team by ID
- **Endpoint**: `GET /api/teams/:id`
- **Auth Required**: 🔑 Yes

#### 5.10 Update Team
- **Endpoint**: `PUT /api/teams/:id`
- **Auth Required**: 🔑 Yes
- **Request Body**:
  ```json
  {
    "name": "Updated Team Name",
    "projectId": "65123456789abcdef0123777",
    "members": ["65123456789abcdef0123001"]
  }
  ```

#### 5.11 Delete Team
- **Endpoint**: `DELETE /api/teams/:id`
- **Auth Required**: 🔑 Yes
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Team deleted successfully"
  }
  ```

---

## ⚡ Error Handling & HTTP Status Codes

| Status Code | Meaning | Description |
| :--- | :--- | :--- |
| **200 OK** | Success | Request succeeded and data is returned |
| **201 Created** | Created | Resource successfully created (POST requests) |
| **400 Bad Request** | Validation Error | Missing required fields or invalid payload format |
| **401 Unauthorized** | Auth Failed | Missing, invalid, or expired JWT token |
| **403 Forbidden** | Access Denied | User does not have permission (e.g. non-admin) |
| **404 Not Found** | Resource Not Found | Specified ID or endpoint does not exist |
| **500 Server Error** | Server Failure | Unexpected database or server error |

---

## 💡 Frontend Integration Quick Reference Code Snippets

```javascript
// src/services/teamService.js
import api from "../api/axios";

// Get all teams with members populated
export const getTeams = async () => {
  const res = await api.get("/teams");
  return res.data.data;
};

// Add student to team
export const addMember = async (teamId, studentId) => {
  const res = await api.post(`/teams/${teamId}/members/${studentId}`);
  return res.data;
};

// Batch remove students from team
export const removeMembers = async (teamId, studentIds) => {
  const res = await api.delete(`/teams/${teamId}/members`, {
    data: { studentIds },
  });
  return res.data;
};
```
