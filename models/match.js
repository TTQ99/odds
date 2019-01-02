let mongoose = require('./db.js')
let Schema = mongoose.Schema

let match = new Schema({
  id: { type: Number },
  home: { type: String },
  away: { type: String },
  hscore: { type: String },
  ascore: { type: String },
  date: { type: Date },
  flag: { type: Boolean, default: false }
})

module.exports = mongoose.model('Match', match)
