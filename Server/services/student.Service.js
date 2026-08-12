
import Student from "../models/student.Model.js";

// CREATE STUDENT
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


// GET ALL Student              Parameter = function ko bahar se milne wali value ka naam.
export const getStudents = async({search})=>{

     let students ;

    // If search exists
    if(search){
         students  = await Student.find({
            //$or: At least one of these conditions should match.
            $or:[{
                name:{
                    $regex: search, //MongoDB, is text/pattern ko field ke andar search karo.
                    $options: "i" //Capital/small letters ka difference ignore karo.
                }},
            {
                rollNumber: Number(search),
            }],
        })
    }
    // If no search
    else{

         students = await Student.find()
    }
     
    return students;
};


// GET Single student by id
export const getStudentById = async (studentId)=>{
    const student = await Student.findById(studentId);

    if(!student){
        throw new Error("Student not found!")
    }
    
    return student;
}


//Update Student 
export const updateStudent = async(studentId, studentData)=>{
    const {rollNumber, name, course, batch} = studentData;
    
    // Check duplicate roll number
   if (rollNumber)
    {
    const existStudent = await Student.findOne({rollNumber,
          //$ne means not equal.
        _id:{$ne: studentId}//Aisa student dhoondo jiska _id hamare current student ke _id ke barabar na ho
        })
        if(existStudent){
        throw new Error("Roll number already exists");
     }
     }
                                // Student ki ID se student ko find karo auuska data update karo.
     const  student = await Student.findByIdAndUpdate(studentId, {rollNumber, name , course, batch},{
         new: true,//Update ke baad updated student return karo. 
         runValidators: true
        }
     );

     if(!student){
        throw new Error("Student not found!")
     }

     return student;     
}


// Delete Student
export const deleteStudent = async (studendId)=>{
    const student = await Student.findByIdAndDelete(studendId);
    
    if(!student){
         throw new Error("Student not found!")
    }
    return student;
}
