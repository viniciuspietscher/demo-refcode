const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



// @desc    POST Create User
// @route   /api/user/
// @access  Public
const createUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error(`Please add all fields`)
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error(`User already exists`)
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPass
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    })
  } else {
    res.status(400)
    throw new Error(`Invalid user data`)
  }
})

// @desc    POST Login User
// @route   /api/user/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    })
  } else {
    res.status(400)
    throw new Error(`Invalid credentials`)
  }
})

// @desc    GET User
// @route   /api/user/
// @access  Private
const getUser = asyncHandler(async(req, res) => {
  
  res.status(200)
  res.json({ message: `Get user information` })
})

// @desc    POST User sends videos
// @route   /api/user/submit
// @access  Private
const submitData = asyncHandler(async(req, res) => {
  res.status(200)
  res.json({message: 'User sends videos'})
})


module.exports = {
  createUser,
  loginUser,
  getUser,
  submitData
}