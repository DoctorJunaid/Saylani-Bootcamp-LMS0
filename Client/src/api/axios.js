import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://saylani-bootcamp-lms-0.vercel.app",
});

// Interceptor to attach JWT token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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

export const getPendingTaskData = async () => {
  const response = await api.get("/api/tasks?status=pending");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/api/dashboard/stats");
  return response.data;
};

export default api;
