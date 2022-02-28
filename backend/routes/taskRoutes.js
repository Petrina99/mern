const express = require('express');
const { 
  getTasks,
  setTask, 
  deleteTask
} = require('../controllers/taskController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect ,getTasks).post(protect, setTask);
router.route('/:id').delete(protect, deleteTask);

module.exports = router;