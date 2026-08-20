import axiosClient from "../api/axiosClient";
import { ENDPOINTS } from "../constants/apiEndpoints";

/**
 * Team & Project Collaboration Service
 */
export const teamService = {
  /**
   * Fetches current assigned team details and member list
   */
  getMyTeam: async () => {
    return await axiosClient.get(ENDPOINTS.TEAM.GET_MY_TEAM);
  },

  /**
   * Fetches assigned capstone/module project specifications
   */
  getProjectDetails: async () => {
    return await axiosClient.get(ENDPOINTS.TEAM.GET_PROJECT);
  },

  /**
   * Submits team github repository URL
   * @param {Object} payload - { repoUrl: string, liveUrl: string }
   */
  submitRepoUrl: async (payload) => {
    return await axiosClient.post(ENDPOINTS.TEAM.SUBMIT_REPO, payload);
  },
};
