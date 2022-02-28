const asyncHandler = require('express-async-handler');

const Task = require('../models/taskModel');

// gets all tasks from db
// /api/tasks
// private access
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });


  res.status(200).json(tasks);
})

// makes a new entry in db, new task
// /api/tasks
// private access

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field.');
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(task);
})

// deletes a task from db
// /api/tasks/id
// private access

const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found.');
  }

  // check for user
  if(!req.user) {
    res.status(401);
    throw new Error('User not found.');
  }

  // make sure the logged in user matches the task user
  if(task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
})

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask
}