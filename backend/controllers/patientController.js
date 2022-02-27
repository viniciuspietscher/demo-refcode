const asyncHandler = require('express-async-handler')
const Video = require('../models/videoModel')

// @desc    GET Videos
// @route   /api/patient/
// @access  Public
const getVideos = asyncHandler(async(req, res) => {
  const uuid = req.body.uuid
  if (!uuid) {
    res.status(400)
    throw new Error('Please add the uuid')
  }
  const data = await Video.findOne({uuid})
  if (data) {
    res.status(200)
    res.json(data.videos)
  } else {
    res.status(400)
    throw new Error(`Invalid data`)
  }
  
})


module.exports = { getVideos }