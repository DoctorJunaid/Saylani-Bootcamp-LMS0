import { createStudent } from "../services/student.Service.js";

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
// 9. Student Controller ke functions

// Student module ke liye minimum CRUD:

// createStudent()
// getStudents()
// getStudentById()
// updateStudent()
// deleteStudent()
// Student.find()
// Student.findOne()
// Student.create()
// Student.findById()
// Student.findByIdAndUpdate()
// Student.findByIdAndDelete()

// Aur search:

// searchStudents()

// Lekin search ko separate endpoint banana zaroori nahi.

// Example:

// GET /api/students?search=102341

// ya:

// GET /api/students?search=Ali

// Controller query handle kar sakta hai.

// Documentation live debounced search by Name or Roll Number specifically require karti hai