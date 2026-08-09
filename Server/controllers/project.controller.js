import { createProjectService, getProjectsService, getProjectByIdService, updateProjectService, deleteProjectService } from "../services/project.Service.js";

// Create Project Controller 
export const createProjectController = async (req, res)=>{
    try {
        const project = await createProjectService(req.body);
        res.status(201).json({
            message:"Project created successfully",
            project
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}


// Get all Projects Controller 
export const getProjectsController = async (req, res)=>{
    try {
        const projects = await getProjectsService();
        res.status(200).json({
            message:"Projects fetched successfully",
            projects
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}


// Get single Project by Id Controller
export const getProjectByIdController = async (req, res)=>{
    try {
        const project = await getProjectByIdService(req.params.id);
        res.status(200).json({
            message:"Project fetched successfully",
            project
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}


// Update Project Controller
export const updateProjectController = async (req, res)=>{
    try {
        const project = await updateProjectService(req.params.id, req.body);
        res.status(200).json({
            message:"Project updated successfully",
            project
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}


// Delete Project Controller
export const deleteProjectController = async (req, res)=>{
    try {
        const project = await deleteProjectService(req.params.id);
        res.status(200).json({
            message:"Project deleted successfully",
            project
        });
    }
    catch (error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}