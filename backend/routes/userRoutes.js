const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { createUser, getUser, loginUser, submitData } = require('../controllers/usersController')


router.post('/login', loginUser)
router.get('/', protect, getUser)
router.post('/', createUser)
router.post('/submit', protect, submitData)

module.exports = router