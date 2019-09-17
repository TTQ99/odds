// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var fs = require('fs')
var files = fs.readdirSync('./data/201901')

// 过滤出.js文件:
var js_files = files.filter(f => {
  return f.endsWith('.js')
})
let arr = []
for (const f of js_files) {
  let mapping = require(`./data/201901/${f}`)
  arr = arr.concat(mapping)
}

console.log(arr.length)

const express = require('express')
const app = express()
app.get('/', (req, res) => {
  var ou = 1.84
  var od = 1.86
  var list = []
  var obj = {
    win: 0,
    lose: 0,
    amout: 100
  }
  var win = []
  arr.forEach(item => {
    if (item.b1 > ou && item.b1 < od) {
      item.flag = item.score.split('-')[0] - item.score.split('-')[1] > 0
      list.push(item)
      if (item.flag) {
        obj.win += item.b1 * obj.amout - 100
      } else {
        obj.lose -= 100
      }
    } else if (item.b3 > ou && item.b3 < od) {
      item.flag = item.score.split('-')[1] - item.score.split('-')[0] < 0
      list.push(item)
      if (item.flag) {
        obj.win += item.b3 * obj.amout - 100
      } else {
        obj.lose -= 100
      }
    }
  })
  obj.num = list.length
  list.forEach(item => {})
  obj.res = obj.win + obj.lose
  obj.total = obj.num * obj.amout
  obj.p = (obj.res / obj.total) * 100

  res.header('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(obj))
})

app.listen('3000')
