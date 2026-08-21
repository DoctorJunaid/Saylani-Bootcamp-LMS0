import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import studentRoutes from "./routes/student.Routes.js";
import projectRoutes from "./routes/project.Routes.js";
import taskRoutes from "./routes/task.Routes.js";
import teamRoutes from "./routes/team.Routes.js";
import adminRouter from "./routes/admin.Routes.js";
import { protectAdmin } from "./middleware/adminAuth.middleware.js";
import attendanceRoutes from "./routes/attendance.Routes.js";
import dashboardRouter from "./routes/dashboard.Routes.js";
import notificationRoutes from "./routes/notification.Routes.js";
// student portal
import studentRouter from "./studentmodules/studentAuth.Route.js";

const app = express();

// Disable information leakage headers
app.disable("x-powered-by");

// CORS Configuration with universal support
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-App-Client",
      "X-Requested-With",
      "Accept",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Payload size limit
app.use(express.json({ limit: "1mb" }));

// Middleware to ensure DB connection on serverless environments like Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed. Please try again.",
    });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "active",
    message: "Saylani SMIT LMS API Server is running",
  });
});

// Student Portal Routes (Mounted on BOTH /api/student-auth and /student-auth for 100% compatibility)
app.use("/api/student-auth", studentRouter);
app.use("/student-auth", studentRouter);

// Admin Routes (Mounted on both /api/admin and /admin)
app.use("/api/admin", adminRouter);
app.use("/admin", adminRouter);

// Protected Admin App Routes
app.use("/api/student", protectAdmin, studentRoutes);
app.use("/api/tasks", protectAdmin, taskRoutes);
app.use("/api/teams", protectAdmin, teamRoutes);
app.use("/api/projects", protectAdmin, projectRoutes);
app.use("/api/attendance", protectAdmin, attendanceRoutes);
app.use("/api/dashboard", protectAdmin, dashboardRouter);
app.use("/api/notifications", protectAdmin, notificationRoutes);

// Fallback without /api prefix
app.use("/student", protectAdmin, studentRoutes);
app.use("/tasks", protectAdmin, taskRoutes);
app.use("/teams", protectAdmin, teamRoutes);
app.use("/projects", protectAdmin, projectRoutes);
app.use("/attendance", protectAdmin, attendanceRoutes);
app.use("/dashboard", protectAdmin, dashboardRouter);
app.use("/notifications", protectAdmin, notificationRoutes);

// Global JSON Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected server error occurred",
  });
});

// 404 Catch-all handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

export default app;
