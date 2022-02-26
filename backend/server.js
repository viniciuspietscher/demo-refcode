const express = require('express')
const app = express()
const env = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/database')
const PORT = process.env.PORT || 5000


connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/user', require('../backend/routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => {console.log(`Server listening on localhost:${PORT}`.green.underline)})