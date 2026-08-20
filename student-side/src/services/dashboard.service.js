import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Student Dashboard Aggregation Service
 */
export const dashboardService = {
  /**
   * Fetches summary statistics, upcoming tasks, attendance %, and team status
   */
  getDashboardData: async () => {
    return await axiosClient.get(ENDPOINTS.DASHBOARD.GET_OVERVIEW);
  },
};
