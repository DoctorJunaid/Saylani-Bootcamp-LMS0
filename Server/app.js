import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { apiShield } from "./middleware/apiShield.middleware.js";
import { globalApiLimiter } from "./middleware/rateLimiter.middleware.js";
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

const FAKE_NGINX_HTML = `<!DOCTYPE html>
<html>
<head><title>403 Forbidden</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fff; color: #000; margin: 40px auto; max-width: 650px; padding: 0 20px;">
<h1 style="font-size: 28px; font-weight: 500; border-bottom: 1px solid #ccc; padding-bottom: 10px;">403 Forbidden</h1>
<p style="font-size: 14px; color: #333;">You don't have permission to access this resource.</p>
<hr style="border: 0; border-top: 1px solid #e0e0e0; margin-top: 20px;">
<p style="font-size: 12px; color: #777;">nginx</p>
</body>
</html>`;

// Disable information leakage headers
app.disable("x-powered-by");

// CORS Configuration with custom client header support
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

// Active API Security Shield: Blocks direct browser navigation only
app.use(apiShield);

// Global Sliding Window Rate Limiter (300 requests per 15 min per IP)
app.use("/api", globalApiLimiter);

// Middleware to ensure DB connection on serverless environments like Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection error:", error.message);
    res.status(503).json({
      success: false,
      message: "Database connection failed. Please check network connectivity.",
    });
  }
});

// Generic Root Route (Hides internal system status from direct visitors)
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(403).send(FAKE_NGINX_HTML);
});

// Public / Auth App Routes
app.use("/api/admin", adminRouter);
app.use("/api/student-auth", studentRouter);

// Protected Admin App Routes
app.use("/api/student", protectAdmin, studentRoutes);
app.use("/api/tasks", protectAdmin, taskRoutes);
app.use("/api/teams", protectAdmin, teamRoutes);
app.use("/api/projects", protectAdmin, projectRoutes);
app.use("/api/attendance", protectAdmin, attendanceRoutes);
app.use("/api/dashboard", protectAdmin, dashboardRouter);
app.use("/api/notifications", protectAdmin, notificationRoutes);

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
  if (req.accepts("html")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(403).send(FAKE_NGINX_HTML);
  }
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

export default app;
