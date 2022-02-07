const express = require('express');
const { getTasks, setTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(getTasks).post(setTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;