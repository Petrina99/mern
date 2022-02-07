const asyncHandler = require('express-async-handler');

const Task = require('../models/taskModel');
// gets all tasks from db
// /api/tasks
// private access
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();


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
  });

  res.status(200).json(task);
})

// updates an existing task
// /api/tasks/id
// private access

const updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
    });


  res.status(200).json(updatedTask);
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

  await task.remove();

  res.status(200).json({ id: req.params.id });
})

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask
}