import { Task } from "../models/taskModel";

// @desc    Get all tasks
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("studentId");

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("studentId");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// @desc    Get tasks by student ID
// @route   GET /api/tasks/student/:studentId
export const getTasksByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const tasks = await Task.find({ studentId }).populate("studentId");

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// @desc    Create task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
    try {
        const { studentId, title, description, dueDate, status } = req.body;

        const task = await Task.create({
            studentId,
            title,
            description,
            dueDate,
            status
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};