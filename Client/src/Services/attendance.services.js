import api from "../api/axios.js";


// Mark / Update Attendance
export const markAttendance = async (data) => {
  const response = await api.post("/attendance", data);

  return response.data;
};


// Get Attendance By Date
export const getAttendanceByDate = async (date) => {
  const response = await api.get(`/attendance/${date}`);

  return response.data;
};


// Get Student Attendance History
export const getStudentAttendanceHistory = async (studentId) => {
  const response = await api.get(`/attendance/student/${studentId}`);

  return response.data;
};


// Get Overall Attendance Stats
export const getOverallAttendanceStats = async () => {
  const response = await api.get("/attendance/stats/overall");

  return response.data;
};