import express from "express"
import { createStudentController, deleteStudentController, getStudentByIdController, getStudentController, updateStudentController } from "../controllers/student.controller.js";



const studentRoutes = express.Router();
// Create student
studentRoutes.post("/", createStudentController);
// Get all students / Search
studentRoutes.get("/", getStudentController)
// Get single student
studentRoutes.get("/:id", getStudentByIdController)
// Update Student 
studentRoutes.put("/:id", updateStudentController)
// Deleted Student 
studentRoutes.delete("/:id", deleteStudentController)

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