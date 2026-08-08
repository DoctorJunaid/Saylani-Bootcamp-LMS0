import express from "express";
import {
    getTasks,
    getTask,
    getTasksByStudent,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller";

const router = express.Router();

router.route("/")
    .get(getTasks)
    .post(createTask);

router.route("/student/:studentId")
    .get(getTasksByStudent);

router.route("/:id")
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

export default router;