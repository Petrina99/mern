const express = require('express');
const { 
  getTasks,
  setTask, 
  updateTask, 
  deleteTask
} = require('../controllers/taskController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect ,getTasks).post(protect, setTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;