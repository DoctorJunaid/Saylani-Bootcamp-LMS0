import axios from "axios";

const api = axios.create({
  baseURL: "https://saylani-bootcamp-lms-0.vercel.app",
});

// Automatically attach the Bearer token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getStudentData = async () => {
  const response = await api.get("/api/student");
  return response.data;
};

export const getTeamData = async () => {
  const response = await api.get("/api/teams");
  return response.data;
};

export const getTaskData = async () => {
  const response = await api.get("/api/tasks");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/api/dashboard/stats");
  return response.data;
};

export const getAttendanceByDate = async (date) => {
  const response = await api.get(`/api/attendance/${date}`);
  return response.data;
};

export default api;
