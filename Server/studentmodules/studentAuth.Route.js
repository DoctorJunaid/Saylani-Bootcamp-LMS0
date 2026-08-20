import express from "express";
import { changeStudentPasswordController, getMyAttendanceController, getMyNotificationsController, getMyProjectsController, getMyTasksController, getMyTeamController, getStudentDashboardController, getStudentMeController, loginStudentController,markAllNotificationsAsReadController,updateMyTaskStatusController } from "./studentAuth.controller.js";
import { protectStudent } from "../middleware/studentAuth.middleware.js";


const studentRouter = express.Router();
// public route
studentRouter.post("/login", loginStudentController)
// private route
studentRouter.get("/me",protectStudent, getStudentMeController)
// Logged-in student apna attendance dekh sakta hai
studentRouter.get("/attendance", protectStudent, getMyAttendanceController)
// get dashboard data
studentRouter.get("/dashboard", protectStudent, getStudentDashboardController)
// GET /api/student/task
studentRouter.get("/tasks",protectStudent, getMyTasksController);
// PATCH /api/student/task/status
studentRouter.patch("/task/status",protectStudent, updateMyTaskStatusController);
// get projects
studentRouter.get("/projects",protectStudent, getMyProjectsController)
// get team
studentRouter.get("/team",protectStudent, getMyTeamController)
// change password
studentRouter.patch("/change-password",protectStudent, changeStudentPasswordController)
// get notification
studentRouter.get("/notifications",protectStudent, getMyNotificationsController)
// Mark all notifications as read
studentRouter.patch("/read-all", protectStudent,markAllNotificationsAsReadController);

export default studentRouter;











// POST /api/student-auth/login
// GET  /api/student-auth/me
// PUT  /api/student-auth/change-password
// POST /api/student-auth/logout