const jwt = require('jsonwebtoken');
const bcyprt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// register new user
// POST
// api/users
// public

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields.');
  }

  // check if user already has an account
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  //hashing the password
  const salt = await bcyprt.genSalt(10);
  const hashedPassword = await bcyprt.hash(password, salt);

  // create user
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
})

// authenticate a user
// POST
// api/users/login
// public

const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // check for email
  const user = await User.findOne({ email });

  if (user && (await bcyprt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
})


// get user data
// GET
// api/users/me
// private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}