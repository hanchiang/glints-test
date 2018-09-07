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
app.use('/', async (req, res, next) => {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errors);

module.exports = app;