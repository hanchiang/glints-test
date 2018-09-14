const { MongoClient } = require('mongodb');

const logger = require('../utils/logger');

let db;

exports.connect = () => {
  if (!db) {
    return MongoClient.connect(process.env.DATABASE, {
      useNewUrlParser: true
    })
      .then(client => {
        db = client.db();
        logger.info('connected to database 😊 😊 😊');
      })
      .catch(err => {
        logger.error({err});
        throw err;
      })
  } else {
    Promise.resolve();
  }
}

exports.get = () => db;