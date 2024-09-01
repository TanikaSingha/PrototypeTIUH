const express = require("express");
const { createTasks, getTasks } = require("../controllers/tasksController");
const taskRouter = express.Router();

taskRouter.route("/:gameId").post(createTasks);
taskRouter.route("/").get(getTasks);

module.exports = taskRouter;
