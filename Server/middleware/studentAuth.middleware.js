import jwt from "jsonwebtoken";
import Student from "../models/student.Model.js";

export const protectStudent = async(req , res , next)=>{
    try {
//1.Authorization header se token lo        //HTTP header ka naam:
        const authHeader =  req.headers.authorization;

        // 2. Token hai ya nahi?
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message:"Authentication token is requried"
            });
        }
        // 3. Bearer ke baad actual token nikalo
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                    message: "invalid authorization format"
                })
        }
       // 4. JWT verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // check student role
        // console.log("Decoded JWT:", decoded);
        if(decoded.role !== "student" ){
            return res.status(403).json({
                success:false,
                message:"Student access only"
            });
        }
         
        // 6. Database se student find karo
        const student = await Student.findById(decoded.studentId);
        // console.log("Student ID:", decoded.studentId);
        if (!student) {
      return res.status(401).json({
        success: false,
        message: "Student not found",
      });
    }

    // 7. Verified student information  request mein save karo
         req.student = {
      id: student._id,
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      role: "student",
    };

    // Authentication successful
    // 8. Ab controller ko request allow karo
        next()
        
    }
     catch (error)
      {
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}
