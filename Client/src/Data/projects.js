import axios from "axios";

const API_URL = "http://localhost:9000/api/projects";

export async function fetchProjects() {
  try {
    const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.projects || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch projects");
  }
}

export async function fetchProjectById(projectId) {
  try {
    const res = await axios.get(`${API_URL}/${projectId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.project || null;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw new Error(error.response?.data?.message || "Failed to fetch project");
  }
}

export async function createProject(projectData) {
  try {
    const res = await axios.post(API_URL, projectData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create project");
  }
}

export async function updateProject(projectId, updateData) {
  try {
    const res = await axios.put(`${API_URL}/${projectId}`, updateData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update project");
  }
}

export async function deleteProject(projectId) {
  try {
    const res = await axios.delete(`${API_URL}/${projectId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete project");
  }
}
