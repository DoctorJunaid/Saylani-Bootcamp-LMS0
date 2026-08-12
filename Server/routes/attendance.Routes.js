import express from "express";

import { getAttendanceByDateController, getOverallAttendanceStatusController, getStudentAttendanceHistoryController, markAttendanceController } from "../controllers/attendance.controller.js";

const attendanceRoutes = express.Router();

// Mark / Update , Save attendance
attendanceRoutes.post("/", markAttendanceController)
// // Get attendance by date
attendanceRoutes.get("/:date", getAttendanceByDateController)
//  Get one student's attendance history
attendanceRoutes.get("/student/:studentId", getStudentAttendanceHistoryController)
// // Get overall attendance percentage
attendanceRoutes.get("/stats/overall", getOverallAttendanceStatusController)

export default attendanceRoutes;

// just when route by /:studentId
// Express ko pata hi nahi ke:
// 6a77252e313ab6c351f70cde
// date hai ya studentId.
// Pehla matching route execute ho jayega.