const mongoose = require('mongoose')

const videosSchema = mongoose.Schema(
  {
    videos: {
      type: Array,
      required: [true, 'Please add an array of videos']
    },
    hash: {
      type: String,
      required: [true, 'Please add a hash']
    }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Videos', videosSchema)