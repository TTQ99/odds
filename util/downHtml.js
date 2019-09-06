const request = require('request')
const fs = require('fs')
const path = require('path')
console.log(path.resolve('/html/match/'))

request(
  {
    url: 'https://www.viomi.com.cn/'
  },
  function(error, response, body) {
    console.log('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
    console.log('body:', typeof body) // Print the HTML for the Google homepage.
    fs.writeFile('12.html', body)
  }
)
