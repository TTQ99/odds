var MongoClient = require('mongodb').MongoClient

MongoClient.connect(
  'http://rkpiip.natappfree.cc/odds',
  function(err, client) {
    if (err) throw err

    var db = client.db('odds')

    db.collection('odds')
      .find()
      .toArray(function(err, result) {
        if (err) throw err

        console.log(result)
      })
  }
)
// github edit
// 123123
// github edit2
