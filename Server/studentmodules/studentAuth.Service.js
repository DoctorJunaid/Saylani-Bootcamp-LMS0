import bcrypt from "bcrypt";
import Student from "../models/student.Model.js";
import { generateToken } from "../utils/generateToken.js";
import Attendance from "../models/attendence.Model.js";
import { Task } from "../models/taskModel.js";
import Project from "../models/project.Model.js";
import Notification from "../models/notification.Model.js";

export const loginStudent = async (identifier, password) => {
    const clean = String(identifier || "").trim();
    if (!clean || !password) {
        throw new Error("Please enter your Roll Number or Email and Password.");
    }

    const student = await Student.findOne({
        $or: [
            { email: clean.toLowerCase() },
            { rollNumber: clean }
        ]
    }).populate("team_id", "name");

    if (!student) {
        throw new Error("Invalid Roll Number/Email or Password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid Roll Number/Email or Password");
    }

    // generate token
    const token = generateToken(student);
    return {
        token,
        student: {
            id: student._id,
            _id: student._id,
            name: student.name,
            email: student.email,
            phone: student.phone || "",
            rollNumber: student.rollNumber,
            course: student.course,
            batch: student.batch,
            team: student.team_id,
            role: "student",
        },
    };
};

// Mujhe current student ka data do."
export const getStudentMe = async(studentId)=>{
     
    // MongoDB mein Student collection ke andar is ID wala student find karo.
    const student = await Student.findById(studentId)
    .select("-password")//Database se student find karo, lekin password field response/data mein mat lao.
    .populate("team_id", "name"); //Mongoose ko bolta hai:
    //team_id ke through related Team document find karo aur uski name bhi le aao.

    if(!student){
        throw new Error("Student not found")
    }
    // Service database se jo student mila hai woh controller ko wapas bhej deta hai.
    return student;
}


// Get Students Attendace History
export const getStudentAttendanceHistory = async(studentId)=>{

    const student = await Student.findById(studentId);
    if(!student){
        throw new Error("Student not found")
    }

    const attendance = await Attendance.find({student_id:studentId}).sort({date : -1});

    return attendance;
}


// student dashboard
export const  getStudentDashboard = async(studentId)=>{

    //1. logged-in student database se find karo 
    const student = await Student.findById(studentId)
    .select("-password")
    .populate("team_id", "name")

    if(!student){
        throw new Error("Student not found")
    }

    // sirf ese student k attendace nikalo
    const attendance = await Attendance.find({student_id: studentId});

    //  attendance counts
    const totalDays = attendance.length;

    const presentDays = attendance.filter((record)=> record.status === "Present").length;
    const absentDays = attendance.filter((record)=> record.status === "Absent").length;
    const leaveDays = attendance.filter((record)=> record.status === "Leave").length;

    // Attendace Percentage
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0 ;

    // Dashbaord par data rerutn karo
    return{
        student:{
            id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      rollNumber: student.rollNumber,
      course: student.course,
      batch: student.batch,
      team: student.team_id,
        },
        attendance:{
            totalDays,
            presentDays,
            absentDays,
            leaveDays,
            percentage: attendancePercentage,
        }
    }
}



// Get only logged-in student's tasks
export const getMyTasks = async (studentId) => {
  const tasks =  await Task.find({ studentId })
    // .populate(studentPopulate)
    .sort({ createdAt: -1 })
    .lean();
    return tasks;
};

// update task stastus
export const updateMyTaskStatus = async (
  studentId,
  taskId,
  status
) => {
  const allowedStatuses = [
    "Pending",
    "In Progress",
    "Completed",
  ];

  // Check karo status allowed hai ya nahi
  if (!allowedStatuses.includes(status)) {
    throw new Error(
      "Invalid status. Use Pending, In Progress or Completed."
    );
  }

  // IMPORTANT:
  // _id = requested task
  // studentId = logged-in student
  //
  // Iska matlab:
  // student sirf APNA task update kar sakta hai.
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      studentId: studentId,
    },
    {
      $set: {
        status: status,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};



// get projects
export const getMyProjects = async (studentId) => {

  // 1. Current student find karo
  const student = await Student.findById(studentId)
  // .select("team_id");

  // 2. Student exist karta hai ya nahi?
  if (!student) {
    throw new Error("Student not found");
  }

  // 3. Student kisi team mein assigned hai ya nahi?
  if (!student.team_id) {
    return [];
  }

  // 4. Student ki team ke projects find karo
  const projects = await Project.find({
    teamId: student.team_id,
  }).sort({ createdAt: -1 });

  return projects;
};

// gets teams
export const getMyTeam = async(studentId)=>{
  // Student ki ID se exactly ek student find karo.
  const student = await Student.findById(studentId).select("team_id");

  // Agar student database mein exist nahi karta
  if(!student){
    throw new Error("Student not found");
  }
  // Student exist karta hai lekin team assign nahi hai
  if(!student.team_id){
    return null;
  }
  // Student ki team with members and projects return karo
  const { Team } = await import("../models/team.Model.js");
  const team = await Team.findById(student.team_id)
    .populate("members", "name rollNumber email phone course batch")
    .populate("projectId");

  return team;
};

// get notification

export const getMyNotifications = async (studentId) => {

  const notifications = await Notification.find({
    studentId: studentId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return notifications;
};

// MARK ALL STUDENT NOTIFICATIONS AS READ
export const markAllNotificationsAsRead = async (studentId) => {

  if (!studentId) {
    throw new Error("Student ID is required");
  }

  const result = await Notification.updateMany(
    {
      studentId: studentId,
      read: false,
    },
    {
      $set: {
        read: true,
      },
    }
  );

  return {
    modifiedCount: result.modifiedCount,
  };
};

// change password
export const changeStudentPassword = async (studentId,currentPassword,newPassword,confirmPassword)=>{
  
  // 1. Find the student by ID
  const student = await Student.findById(studentId);
  if(!student){
    throw new Error("Student not found");
  }

  // 2. Compare incoming currentPassword with the database password
  const passwordCorrect = await bcrypt.compare(currentPassword, student.password);

  if(!passwordCorrect){
    throw new Error("Current password is incorrect")
  }

  // 3. Validate new password length
  if(!newPassword || newPassword.length < 8){
    throw new Error("New Passowrd must be at least 8 characters");
  }

  //  NEW TYPO CHECK: Confirm new passwords match perfectly
  if(newPassword !== confirmPassword){
    throw new Error("New Passowrd and Confirm password do not match")
  }

  if(currentPassword === newPassword){
    throw new Error ("New password cannot be the same as your current password")
  }


  // 4. Hash and save the new password
  const hashedPassword = await  bcrypt.hash(newPassword, 10);
  student.password = hashedPassword;
  await student.save();

  return true;
}





























