/**
 * API Endpoints Constants
 * Centralized list of backend routes for the Student Portal.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:9000/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/student-auth/login",
    ME: "/student-auth/me",
    LOGOUT: "/student-auth/logout",
    CHANGE_PASSWORD: "/student-auth/change-password",
  },
  DASHBOARD: {
    GET_OVERVIEW: "/student-auth/dashboard",
  },
  ATTENDANCE: {
    GET_RECORDS: "/student-auth/attendance",
  },
  TASKS: {
    GET_ALL: "/student-auth/tasks",
    UPDATE_STATUS: "/student-auth/task/status",
  },
  PROJECTS: {
    GET_MY_PROJECTS: "/student-auth/projects",
  },
  TEAM: {
    GET_MY_TEAM: "/student-auth/team",
  },
  NOTIFICATIONS: {
    GET_ALL: "/student-auth/notifications",
    READ_ALL: "/student-auth/read-all",
  },
};
