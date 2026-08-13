import Student from "../models/student.Model.js";
import { Team } from "../models/team.Model.js";
import { Task } from "../models/taskModel.js";
import Attendance from "../models/attendence.Model.js";

export const getDashboardStatsService = async (dateStr) => {
  let queryDate;
  if (dateStr) {
    queryDate = new Date(dateStr);
  } else {
    const todayStr = new Date().toISOString().split("T")[0];
    queryDate = new Date(todayStr);
  }

  const [totalStudents, totalTeams, pendingTasks, attendanceRecords] = await Promise.all([
    Student.countDocuments(),
    Team.countDocuments(),
    Task.countDocuments({ status: { $in: ["pending", "Pending"] } }),
    Attendance.find({ date: queryDate })
  ]);

  const presentToday = attendanceRecords.filter((r) => r.status === "Present").length;
  const absentToday = attendanceRecords.filter((r) => r.status === "Absent").length;
  const leaveToday = attendanceRecords.filter((r) => r.status === "Leave").length;
  const notMarkedToday = attendanceRecords.filter((r) => r.status === "Not marked").length;

  return {
    totalStudents,
    totalTeams,
    pendingTasks,
    attendanceToday: {
      date: queryDate,
      totalRecords: attendanceRecords.length,
      present: presentToday,
      absent: absentToday,
      leave: leaveToday,
      notMarked: notMarkedToday
    }
  };
};
