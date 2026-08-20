import axios from "axios";
import { API_BASE_URL } from "../constants/apiEndpoints";
import { storage } from "../utils/storage";

/**
 * Pre-configured Axios instance for Student Portal.
 * Automatically injects the JWT Bearer token into Authorization headers,
 * and intercepts 401 Unauthorized responses to perform graceful logout.
 */
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Student JWT Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error & Auth Expiry Handler
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Token expired or invalid — clear state and redirect to login
      storage.clearAuth();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected network error occurred.";

    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
