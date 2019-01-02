let Match = require('./match')

function insert() {
  let match = new Match({
    id: 1,
    home: 'china',
    away: 'USA',
    hscore: '9',
    ascore: '0',
    date: new Date()
  })

  match.save((err, res) => {
    if (err) {
      console.log(`error:${err}`)
    } else {
      console.log(`res:${res}`)
    }
  })
}

insert()
