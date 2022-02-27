const mongoose = require('mongoose')

const videosSchema = mongoose.Schema(
  {
    videos: {
      type: Array,
      required: [true, 'Please add an array of videos']
    },
    language: {
      type: String,
      required: [true, 'Please add a language']
    },
    uuid: {
      type: String,
      required: [true, 'Please add a uuid']
    }
  },
  { timestamps: false }
)

module.exports = mongoose.model('Videos', videosSchema)