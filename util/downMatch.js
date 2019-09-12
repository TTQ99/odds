const request = require('request')
const iconv = require('iconv-lite')
const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

let time = dayjs('201901011')
let day = time.format('YYYYMMDD')
console.log(day)

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function downloadMatch(date) {
  // const url = `http://bf.win007.com/football/Over_${date}.htm`
  const url = 'http://op1.win007.com/oddslist/1656480.htm'

  const options = {
    url: url
  }
  request(options).on('response', function(res) {
    var chunks = []
    res.on('data', function(chunk) {
      chunks = chunks.concat(chunk)
    })
    res.on('end', function() {
      var buf = Buffer.concat(chunks)
      // 转码
      var text = iconv.decode(buf, 'gbk')
      // console.log(text)
      fs.writeFileSync(resolve(`html/`) + `${date}.html`, text)
      time = time.add(1, 'day')
      day = time.format('YYYYMMDD')
      console.log(day)
      if (time.isBefore(dayjs())) {
        // downloadMatch(day)
      }
    })
  })
}
downloadMatch(day)
