const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

fs.readdir('./html/match/', function(err, files) {
  if (err) throw err
  files.forEach(item => {
    readType(item)
  })
})

let importantIds = ''
function readType(date) {
  fs.readFile(`./html/match/${date}`, 'utf8', (err, data) => {
    if (err) throw err
    let arr = data.match(/importantSclass\s?=\s?"([0-9]|,)+"/)
    // console.log(arr)
    try {
      eval(`var ${arr[0]}`)
      importantIds += importantSclass
      if (date == '20190908.html') {
        console.log(importantIds)
        // fn(importantIds)
      }
    } catch (err) {
      console.log(err)
    }
  })
}

// readType(htmls[0])
function fn(text) {
  fs.writeFile(`./match/import1.js`, text)
}
