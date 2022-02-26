const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
  next()
}

module.exports = { errorHandler }