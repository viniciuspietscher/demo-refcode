const express = require('express')
const app = express()
const env = require('dotenv').config()
const colors = require('colors')
const PORT = process.env.PORT || 5000

app.use('/api/user', require('../backend/routes/userRoutes'))


app.listen(PORT, () => {console.log(`Server listening on localhost:${PORT}`.green.underline)})