let Day = require('dayjs')
let request = require('request')
let Match = require('../models/match')
console.log(Match)

a = Day('2018-01-01').valueOf()
a += 86400000
console.log(a)
let date = `2018-01-01`

let url = `http://data.7m.com.cn/result_data/${date}/index_big.js`

// request(url, (err, res, body) => {
//   console.log(res)
//   console.log('---------------------')

//   console.log(body)
//   if (err) {
//     throw err
//   } else {
//     eval(body)
//   }
// })

// import {
//   Start_time_Arr,
//   live_bh_Arr,
//   Team_B_Arr,
//   Team_A_Arr,
//   live_a_Arr,
//   live_b_Arr
// } from './index_big'
function handle() {
  for (let key in d.live_bh_Arr) {
    let time = d.Start_time_Arr[key].split(',')
    time = `${time[0]}-${time[1]}-${time[2]} ${time[3]}:${time[4]}`
    // time = Day(time).valueOf
    if (Day(time).valueOf() < Day(date).valueOf() + 86400001) {
      let info = {
        id: d.live_bh_Arr[key],
        home: d.Team_A_Arr[key],
        away: d.Team_B_Arr[key],
        hscore: d.live_a_Arr[key],
        ascore: d.live_b_Arr[key],
        date: time,
        matchname: d.Match_name_Arr[key],
        flag: false
      }
      console.log(info)
      insert(info)
    }
  }
}

let d = require('./index_big')

handle()

function insert(data) {
  let match = new Match(data)

  match.save((err, res) => {
    if (err) {
      console.log(`error:${err}`)
    } else {
      console.log(`res:${res}`)
    }
  })
}
