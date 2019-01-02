let mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/odds'

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => {
  console.log('mongoDB connection success')
})

mongoose.connection.on('error', err => {
  console.log(`mongoDB connection error: ${err}`)
})

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
