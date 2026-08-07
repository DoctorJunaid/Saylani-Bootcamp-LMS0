import Student from "../models/student.Model.js";

export const createStudent =  async (studentData)=>{
    const {rollNumber, name , course, batch} = studentData;

    // Validation or Check required fields
    if (!rollNumber || !name || !course || !batch){
        throw new Error("All fields are requried")
    }
     
    // Check duplicate roll number or // Duplicate check
    const existStudent = await Student.findOne({rollNumber})

    if(existStudent){
        throw new Error("User already exists")
    }

    // create student
    const student = await Student.create({rollNumber, name, course, batch});

    return student
}