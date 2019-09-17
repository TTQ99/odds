// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var fs = require('fs')
var files = fs.readdirSync('../data/201901')

// 过滤出.js文件:
var js_files = files.filter(f => {
  return f.endsWith('.js')
})

console.log(js_files)
