const express = require('express')
const router = express.Router()
const { getUser, loginUser, submitData } = require('../controllers/usersController')


router.post('/login', loginUser)
router.get('/', getUser)
router.post('/submit', submitData)

module.exports = router