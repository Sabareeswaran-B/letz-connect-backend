const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 200,
  },
  email: {
      type: String,
      required: true,
      min: 11,
  },
  password: {
      type: String,
      required: true,
      min: 8
  },
  education: {
    type: Array,
    default: []
  },
  experience: {
    type: Array,
    default: []
  }
},{timestamps: true}
)
module.exports = mongoose.model('User',userSchema)