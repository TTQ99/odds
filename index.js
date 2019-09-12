const express = require('express')
const request = require('request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
var async = require('async')

const app = express()

const url = `http://bf.win007.com/football/Over_20190318.htm`

app.get('/', (req, res) => {
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
      var match = []
      $('#table_live tr').each(function(index, item) {
        var $element = $(item)
        var a = {}
        var id = ''
        $element.find('td').each((i, e) => {
          if (i == 3) {
            a.ht = $(e).text()
          } else if (i == 4) {
            a.score = $(e).text()
          } else if (i == 5) {
            a.at = $(e).text()
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
        if (a.id) {
          match.push(a)
        }
        async.mapLimit(
          match,
          5,
          function(url, callback) {
            console.log(url)

            fetchUrl(url, callback)
          },
          function(err, result) {
            console.log('final:')
            console.log(result)
            // res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            // res.end(JSON.stringify(result))
          }
        )
      })
    })
  })
})

app.listen(3000, () => {
  console.log('example app listening on port 3000')
})

// http://op1.win007.com/oddslist/1656480.htm
// http://1x2d.win007.com/1656480.js

let fetchUrl = function(obj, callback) {
  var id = obj.id
  console.log(`正在load${id}的比赛`)
  if (!id) return callback(null, obj)
  // console.log(`http://1x2d.win007.com/${id}.js`)

  request({ url: `http://1x2d.win007.com/${id}.js` }).on('response', function(
    err,
    sres
  ) {
    if (err) {
      throw err
    }
    var chunks = []
    sres.on('data', function(chunk) {
      chunks = chunks.concat(chunk)
    })
    sres.on('end', function() {
      var buf = Buffer.concat(chunks)
      // 转码
      var text = iconv.decode(buf, 'utf-8')
      console.log(text)
      try {
        eval(text)

        let a = workData(game, gameDetail)
        Object.assign(obj, a)
        console.log('---------')
        console.log(obj)

        callback(null, obj)
      } catch (err) {
        callback(null, obj)
      }
    })
  })
}

let workData = function(game, gameDetail) {
  let obj = {}
  if (game) {
    game.forEach(element => {
      if (element.split('|')[0] == 104) {
        Object.assign(obj, {
          name: element.split('|')[21],
          companyId: element.split('|')[0],
          oddid: element.split('|')[1],
          b1: element.split('|')[3],
          b2: element.split('|')[4],
          b3: element.split('|')[5]
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
          list: arr,
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
// fetchUrl('1656488', workData)
