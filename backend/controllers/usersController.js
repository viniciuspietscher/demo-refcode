const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const validator = require('email-validator')
const { v4: uuidv4 } = require('uuid')
const Video = require('../models/videoModel')



// @desc    POST Create User
// @route   /api/user/
// @access  Public
const createUser = asyncHandler(async(req, res) => {
  
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error(`Please add all fields`)
  }

  if (!validator.validate(email)) {
    res.status(400)
    throw new Error('Please add an valid email')
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
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
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
  if (!req.body.videos) {
    res.status(400)
    throw new Error('Please select at least one video')
  }
  if (!req.body.lang) {
    res.status(400)
    throw new Error('Please select the target language')
  }
  
  const uuid = generateUuid()
  const videos = req.body.videos.split(', ')
  const lang = req.body.lang
  const videos_lang = getTranslatedVideo(videos, lang)

  const addVideo = await Video.create({
    videos: videos_lang,
    language: lang,
    uuid,
  })

  if (addVideo) {
    res.status(201).json({
      videos: addVideo.videos,
      uuid: addVideo.uuid,
      lang: addVideo.language
    })
  } else {
    res.status(400)
    throw new Error(`Invalid data`)
  }

  // Add method to send patient the video
  
})

// get video on target language
const getTranslatedVideo = (arr, lang) => {
  let translatedVideos = []
  arr.forEach(e => {
    translatedVideos.push(`${e.split('.')[0]}.${lang}.${e.split('.')[1]}`)
  })
  return translatedVideos
}

// UUID
const generateUuid = () => {
  return uuidv4()
}

// JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET,
  {
    expiresIn: "30d"
  })
}


module.exports = {
  createUser,
  loginUser,
  getUser,
  submitData
}