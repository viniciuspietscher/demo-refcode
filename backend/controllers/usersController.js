const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { v4: uuidv4 } = require('uuid')



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
      password: user.password,
      token: generateToken(user._id)
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
      password: user.password,
      token: generateToken(user._id)
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
  const { _id, name, email } = await User.findById(req.user.id)
  res.status(200)
  res.json({ id: _id, name, email })
})

// @desc    POST User sends videos
// @route   /api/user/submit
// @access  Private
const submitData = asyncHandler(async(req, res) => {
  let uuid = await generateUuid()
  const videos = req.body.videos.split(', ')
  res.status(200)
  res.json({videos, uuid})
})


  // UUID
  const generateUuid = () => {
    return uuidv4()
  }
  // JWT
  const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: "30d"
    })
  }


module.exports = {
  createUser,
  loginUser,
  getUser,
  submitData
}