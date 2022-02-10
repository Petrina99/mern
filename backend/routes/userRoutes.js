const express = require('express');
const router = express.Router();

const { 
  registerUser, 
  getCurrentUser,
  loginUser,
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);


module.exports = router;
