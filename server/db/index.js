const { MongoClient } = require('mongodb');

let db;

exports.connect = () => {
  if (!db) {
    return MongoClient.connect(process.env.DATABASE, {
      useNewUrlParser: true
    })
      .then(client => {
        db = client.db();
        console.log('connected to database 😊 😊 😊');
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  } else {
    Promise.resolve();
  }
}

exports.get = () => db;