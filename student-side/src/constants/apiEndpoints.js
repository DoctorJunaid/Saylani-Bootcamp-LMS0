/**
 * API Endpoints Constants
 * Centralized list of backend routes for the Student Portal.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/student-auth/login",
    ME: "/student-auth/me",
    LOGOUT: "/student-auth/logout",
    CHANGE_PASSWORD: "/student-auth/change-password",
  },
  DASHBOARD: {
    GET_OVERVIEW: "/student-portal/dashboard",
  },
  ATTENDANCE: {
    GET_RECORDS: "/student-portal/attendance",
    GET_SUMMARY: "/student-portal/attendance/summary",
  },
  TASKS: {
    GET_ALL: "/student-portal/tasks",
    GET_BY_ID: (id) => `/student-portal/tasks/${id}`,
    SUBMIT: (id) => `/student-portal/tasks/${id}/submit`,
  },
  TEAM: {
    GET_MY_TEAM: "/student-portal/team",
    GET_PROJECT: "/student-portal/project",
    SUBMIT_REPO: "/student-portal/project/submit-repo",
  },
  PROFILE: {
    GET_PROFILE: "/student-portal/profile",
    UPDATE_PROFILE: "/student-portal/profile",
  },
};
