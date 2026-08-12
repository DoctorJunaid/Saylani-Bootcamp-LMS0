import projectModel from "../models/project.Model.js";

// create project service
export const createProjectService = async (projectData) => {
    const project = await projectModel.create(projectData);
    return project;
}


// get all projects service
// export const getProjectsService = async () => {
//     const projects = await projectModel.find();
//     return projects;
// }
export const getProjectsService = async () => {
<<<<<<< HEAD
  const projects = await projectModel
    .find()
    .populate("teamId");

  return projects;
};
=======
    const projects = await projectModel.find().populate("teamId");
    return projects;
}
>>>>>>> ff6739968ace9d15f90467f18ba83127d82133b8


// get single project by Id service
// export const getProjectByIdService = async (id) => {
//     const project = await projectModel.findById(id);
//     return project;
// }
export const getProjectByIdService = async (id) => {
<<<<<<< HEAD
  const project = await projectModel
    .findById(id)
    .populate("teamId");

  return project;
};
=======
    const project = await projectModel.findById(id).populate("teamId");
    return project;
}
>>>>>>> ff6739968ace9d15f90467f18ba83127d82133b8


// update project service
export const updateProjectService = async (id, projectData) => {
    const project = await projectModel.findByIdAndUpdate(id, projectData, { new: true });
    return project;
}


// delete project service
export const deleteProjectService = async (id) => {
    const project = await projectModel.findByIdAndDelete(id);
    return project;
}

