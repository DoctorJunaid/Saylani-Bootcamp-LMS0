import { Task } from "../models/taskModel.js";
import Student from "../models/student.Model.js";

// @desc    Get all tasks from database
export const getAllTasksService = async () => {
    return await Task.find().populate("studentId");
};

// @desc    Get single task by ID
export const getTaskByIdService = async (id) => {
    return await Task.findById(id).populate("studentId");
};

// @desc    Get tasks belonging to a specific student
export const getTasksByStudentService = async (studentId) => {
    return await Task.find({ studentId }).populate("studentId");
};

// @desc    Create a new task
export const createTaskService = async (taskData) => {
    const { studentId, title, description, dueDate, status } = taskData;

    // Basic validation
    if (!studentId || !title) {
        throw new Error("Student ID and task title are required");
    }

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
        throw new Error("Referenced student does not exist");
    }

    const task = await Task.create({
        studentId,
        title,
        description,
        dueDate,
        status
    });

    return task;
};

// @desc    Update task by ID
export const updateTaskService = async (id, updateData) => {
    if (updateData.studentId) {
        const studentExists = await Student.findById(updateData.studentId);
        if (!studentExists) {
            throw new Error("Referenced student does not exist");
        }
    }

    const task = await Task.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    return task;
};

// @desc    Delete task by ID
export const deleteTaskService = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    return task;
};
