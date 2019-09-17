const express = require('express')
const request = require('request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
var async = require('async')
const { arr2 } = require('./match/class')
const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

let time = dayjs('20190131')
let day = time.format('YYYYMMDD')
console.log(day)

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let count = 0

var match = []

const url = `http://bf.win007.com/football/Over_${day}.htm`

request({ url: url }).on('response', function(sres) {
  var chunks = []
  sres.on('data', function(chunk) {
    chunks = chunks.concat(chunk)
  })
  sres.on('end', function() {
    var buf = Buffer.concat(chunks)
    // 转码
    var text = iconv.decode(buf, 'gb2312')
    var $ = cheerio.load(text)
    $('#table_live tr').each(function(index, item) {
      var $element = $(item)
      var a = {}
      var id = ''
      let classid = '9999999999'
      if ($element.attr('name')) {
        classid = $element.attr('name').split(',')[0]
      }
      a.classid = classid
      $element.find('td').each((i, e) => {
        if (i == 0) {
          a.class = $(e).text()
        } else if (i == 3) {
          a.ht = $(e)
            .text()
            .replace(/\[.*\]/, '')
        } else if (i == 4) {
          a.score = $(e).text()
        } else if (i == 5) {
          a.at = $(e)
            .text()
            .replace(/\[.*\]/, '')
        } else if (i == 9) {
          id = $(e)
            .find('a')
            .attr('onclick')
          if (id) {
            a.id = id.split('(')[1].split(')')[0]
          } else {
            a.id = ''
          }
        }
      })
      if (a.id && arr2.includes(a.classid)) {
        console.log(a)
        match.push(a)
      }
    })

    fetchUrl(match[count])
  })
})

// http://op1.win007.com/oddslist/1656480.htm
// http://1x2d.win007.com/1656480.js

let fetchUrl = function(obj, flag) {
  count = count + 1
  console.log(count)
  console.log(`下载${obj.id}`)

  request({ url: `http://1x2d.win007.com/${obj.id}.js` }).on(
    'response',
    function(sres) {
      var chunks = []
      sres.on('data', function(chunk) {
        chunks = chunks.concat(chunk)
      })
      sres.on('end', function() {
        var buf = Buffer.concat(chunks)
        // 转码
        var text = iconv.decode(buf, 'utf-8')
        try {
          eval(text)
          let a = workData(game, gameDetail)
          Object.assign(obj, a)
        } catch (err) {}

        if (count == match.length - 1) {
          let array1 = []
          match.forEach(item => {
            if (item.b1) {
              array1.push(item)
            }
          })
          console.log('下载成功')
          fs.writeFileSync(
            `./data/${day}.js`,
            `module.exports = ${JSON.stringify(array1)}`
          )
        } else {
          fetchUrl(match[count])
        }
      })
    }
  )
  // console.log(`http://1x2d.win007.com/${id}.js`)
}

let workData = function(game, gameDetail) {
  let obj = {}
  if (game) {
    game.forEach(element => {
      if (element.split('|')[0] == 104) {
        Object.assign(obj, {
          companyName: element.split('|')[21],
          companyId: element.split('|')[0],
          oddid: element.split('|')[1]
          // b1: element.split('|')[3],
          // b2: element.split('|')[4],
          // b3: element.split('|')[5]
        })
      }
    })
  }
  if (gameDetail) {
    gameDetail.forEach(item => {
      if (item.split('^')[0] == obj.oddid) {
        let arr = item.split('^')[1].split(';')
        Object.assign(obj, {
          oddid: item.split('^')[0],
          list: JSON.stringify(arr),
          b1: arr[arr.length - 2].split('|')[0],
          b2: arr[arr.length - 2].split('|')[1],
          b3: arr[arr.length - 2].split('|')[2],
          e1: arr[0].split('|')[0],
          e2: arr[0].split('|')[1],
          e3: arr[0].split('|')[2]
        })
      }
    })
  }
  return obj
}
// fetchUrl([{ id: '1552345' }])

// let a = require('./app.js')
// let b = require('./data/20190101')
// console.log(b)
