import express from "express"
import { createStudentController } from "../controllers/student.controller.js";



const studentRoutes = express.Router();

studentRoutes.post("/", createStudentController);

export default studentRoutes;

// POST
//    ↓
// createStudent

// GET
//    ↓
// getStudents

// GET /:id
//    ↓
// getStudentById

// PATCH /:id
//    ↓
// updateStudent

// DELETE /:id
//    ↓
// deleteStudent