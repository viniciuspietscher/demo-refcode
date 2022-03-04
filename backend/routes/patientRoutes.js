const express = require('express')
const router = express.Router()
const { getVideos } = require('../controllers/patientController')

// router.get('/', getVideos)
router.get('/:id', getVideos)

module.exports = router