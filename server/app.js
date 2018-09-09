const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes');
const db = require('./db');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.DATABASE })
}));

// Create a user for each session
app.use(async (req, res, next) => {
  console.log('session id: ' + req.sessionID);
  if (!req.session.isUserCreated) {
    try {
      const result = await db.get().collection('users').insertOne({
        _id: req.sessionID,
        name: '',
        collections: []
      });
      req.session.isUserCreated = true;
    } catch(err) {
      next(err);
    }
  }
  next();
})

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errors);

module.exports = app;