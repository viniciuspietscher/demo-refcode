const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc    POST User
// @route   /api/user/login
// @access  Public
const loginUser = (req, res) => {
  res.status(200)
  res.json({message: 'User login'})
}

// @desc    GET User
// @route   /api/user/
// @access  Private
const getUser = (req, res) => {
  res.status(200)
  res.json({ message: `Get user information` })
}


// @desc    POST User
// @route   /api/user/submit
// @access  Private
const submitData = (req, res) => {
  res.status(200)
  res.json({message: 'User sends videos'})
}


module.exports = {
  loginUser,
  getUser,
  submitData
}