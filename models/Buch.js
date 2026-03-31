var mongoose = require('mongoose')

var buchSchema = new mongoose.Schema({
  titel: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  seiten: {
    type: Number
  },
  gelesen: {
    type: Boolean,
    default: false
  },
  erstellt: {
    type: Date,
    default: Date.now
  }
})

var Buch = mongoose.model('Buch', buchSchema)

module.exports = Buch
