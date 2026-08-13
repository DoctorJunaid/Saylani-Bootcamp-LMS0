import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

const normalizeProject = (project) => {
  return {
    id: project._id,
    title: project.title,
    description: project.description,
    deadline: project.dueDate,
    status: project.status,
    progress: project.progress ?? 0,
    teamId: project.teamId?._id ?? project.teamId,
  };
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data.projects.map(normalizeProject);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch projects"
    );
  }
};

export const fetchProjectById = async (projectId) => {
  try {
    const response = await axios.get(
      `${API_URL}/${projectId}`
    );

    return normalizeProject(response.data.project);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Failed to fetch project"
    );
  }
};