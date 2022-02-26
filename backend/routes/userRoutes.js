const express = require('express')
const router = express.Router()
const { createUser, getUser, loginUser, submitData } = require('../controllers/usersController')


router.post('/login', loginUser)
router.get('/', getUser)
router.post('/', createUser)
router.post('/submit', submitData)

module.exports = router