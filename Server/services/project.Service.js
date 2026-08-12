import projectModel from "../models/project.Model.js";
import { Team } from "../models/team.Model.js";

// create project service
export const createProjectService = async (projectData) => {
    if (projectData.teamId) {
        const teamExists = await Team.findById(projectData.teamId);
        if (!teamExists) {
            throw new Error("Referenced team does not exist");
        }
    }
    const project = await projectModel.create(projectData);
    return project;
}


// get all projects service
export const getProjectsService = async () => {
    const projects = await projectModel.find().populate("teamId");
    return projects;
}


// get single project by Id service
export const getProjectByIdService = async (id) => {
    const project = await projectModel.findById(id).populate("teamId");
    return project;
}


// update project service
export const updateProjectService = async (id, projectData) => {
    if (projectData.teamId) {
        const teamExists = await Team.findById(projectData.teamId);
        if (!teamExists) {
            throw new Error("Referenced team does not exist");
        }
    }
    const project = await projectModel.findByIdAndUpdate(id, projectData, { new: true });
    return project;
}


// delete project service
export const deleteProjectService = async (id) => {
    const project = await projectModel.findByIdAndDelete(id);
    return project;
}

