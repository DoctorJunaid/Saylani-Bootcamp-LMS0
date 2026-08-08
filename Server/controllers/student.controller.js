
import Student from "../models/student.Model.js";
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from "../services/student.Service.js";

// CREATE STUDENT
export const createStudentController = async (req, res)=>{
     try {  
    const student = await createStudent(req.body);
    // 201 Created - New resource created=> POST, PUT
    res.status(201).json({message:"Student Created successfully", student
    });

     }
      catch (error) 
      {
         res.status(500).json({
            message:error.message
         });
     }   
}

// GET ALL STUDENTS
export const getStudentController = async (req , res)=>{
    try {                                 
        //  const { search } = req.query;  // Query = URL ke ? ke baad bheji hui information.
        const students = await getStudents(req.query);
        res.status(200).json({
            message:"Students fetched Sucessfully",
            students,
        });
    } 
    catch (error)
     {
        res.status(500).josn({
            message:error.message
        })
    }
}

// GET SINGLE STUDENT by id
export const getStudentByIdController = async (req, res)=>{
    try {
        const student = await getStudentById(req.params.id);
        res.status(200).json({
            message:"Student fetched sucessfully!",
            student,
        })
        
    } catch (error)
     {
      res.status(500).json({message: error.message})  
    }
}

// update student
export const updateStudentController = async (req, res)=>{
    try {
        //  console.log("PARAMS:", studentId);
        //  console.log("BODY:", req.body); for error checking
        
        const student = await updateStudent(req.params.id, req.body);
        res.status(200).json({
            message:"Student Updated Sucessfully!",
            student
        })
        
    } catch (error) 
    {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Delte Student 
export const deleteStudentController = async (req , res)=>{
    try {
        const student = await deleteStudent(req.params.id);
        res.status(200).json({
            message:"Student Deleted Sucessfully",
        })
    } 
    catch (error) 
    {
        res.status(500).json({
            errorMessage : error.message,
        })
    }
}

// Aur search:

// searchStudents()

// Lekin search ko separate endpoint banana zaroori nahi.

// Example:

// GET /api/students?search=102341

// ya:

// GET /api/students?search=Ali

// Controller query handle kar sakta hai.

// Documentation live debounced search by Name or Roll Number specifically require karti hai