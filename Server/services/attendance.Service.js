import Attendance from "../models/attendence.Model.js";
import Student from "../models/student.Model.js";

// MARK / UPDATE ATTENDANCE
export const markAttendance = async (students , date) =>{

     // Date ka day check karo
  const day = new Date(date).getDay();

  // 0 = Sunday
  if (day === 0) {
    throw new Error("Attendance cannot be marked on Sunday");
  }

    const attendanceRecords = [];

    for (const student of students){
        // check student exist
        const existingStudent = await Student.findById(student.student_id)
        
        if(!existingStudent) {
            throw new Error(`Student not Found ${student.student_id}`)
        }

        // create or update student 
        const attendance = await Attendance.findOneAndUpdate({
        student_id: student.student_id,
        date: new Date(date)
    },
    {
        student_id:student.student_id,
        date:new Date(date),
        status:student.status || "Not marked",
        checkInTime:student.checkInTime || "",
        checkOutTime:student.checkOutTime || "",
        note:student.note || "",
    },
    {
        new:  true,
        upsert: true,
        runValidators:true,
    }); 
         attendanceRecords.push(attendance);
      };

         return attendanceRecords;
}

//  GET ATTENDANCE BY DATE
export const getAttencdanceByDate =   async (date)=>{
    
    // console.log("DATE RECEIVED:", date);
    const attendance = await Attendance.find({date : new Date(date)})
    .populate("student_id", "rollNumber name course batch")
    .sort({createdAt: 1})
//  console.log("ATTENDANCE FOUND:", attendance);
    return attendance;
}

// Get Students Attendace History
export const getStudentAttendacehistory = async(studentId)=>{

    const student = await Student.findById(studentId)
    if(!student){
        throw new Error("Stduent not found")
    }

    const attendance = await Attendance.find({student_id : studentId})
    .sort({date: -1});
    return attendance;

}

// get overall attendance status;
export const getOverAllAttendanceStatus =  async()=>{

    const students = await Student.find();

    const stats = [];

    for (const student of students){
        const attendance = await Attendance.find({student_id : student._id});
           
        // just Sunday ko exclude karo
    const workingDays = attendance.filter((record) => {
      const day = new Date(record.date).getDay();//Attendance record ki date check karo. Agar Sunday nahi hai to us record ko workingDays mein rakho.

      return day !== 0;
    });
        const totalDays = workingDays.length;

        const presentDays = workingDays.filter((record)=> record.status === "Present").length;
        const absentDays = workingDays.filter((record)=> record.status === "Absent").length;
        const leaveDays = workingDays.filter((record)=> record.status === "Leave").length;

        const percentage = totalDays > 0 ? (presentDays / totalDays ) * 100 : 0;

        stats.push({
              student: {
                id: student._id,
                rollNumber: student.rollNumber,
                name: student.name,
                course: student.course,
                batch: student.batch,
              },
              totalDays,presentDays,absentDays,leaveDays,percentage,
        });

        
    }
    return stats;
}