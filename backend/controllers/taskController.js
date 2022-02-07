
// gets all tasks from db
// /api/tasks
// private access
const getTasks = (req, res) => {
  res.status(200).json({ message: 'Get tasks' });
}

// makes a new entry in db, new task
// /api/tasks
// private access

const setTask = (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field.');
  }

  res.status(200).json({ message: 'Set task' });
}

// updates an existing task
// /api/tasks/id
// private access

const updateTask = (req, res) => {
  res.status(200).json({ message: `Update task ${req.params.id}` });
}

// deletes a task from db
// /api/tasks/id
// private access

const deleteTask = (req, res) => {
  res.status(200).json({ message: `Delete task ${req.params.id}` });
}

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask
}