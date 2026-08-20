import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Student Attendance Service
 */
export const attendanceService = {
  /**
   * Fetches all attendance logs and history for the logged-in student
   * @param {Object} params - { month, year, status }
   */
  getAttendanceRecords: async (params = {}) => {
    return await axiosClient.get(ENDPOINTS.ATTENDANCE.GET_RECORDS, { params });
  },

  /**
   * Fetches overall attendance percentage and summary metrics
   */
  getAttendanceSummary: async () => {
    return await axiosClient.get(ENDPOINTS.ATTENDANCE.GET_SUMMARY);
  },
};
