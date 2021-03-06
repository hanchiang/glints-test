const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes');
const db = require('./db');
const logger = require('./utils/logger');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: process.env.DATABASE })
}));

// Create a user for each session
app.use(async (req, res, next) => {
  logger.info(`session id: ${req.sessionID}, req method: ${req.method}`);
  if (req.method !== 'OPTIONS' && !req.session.isUserCreated) {
    // referrer is sent as a query param via GET /users/collections, if user is invited
    const { referrer } = req.query;
    try {
      const newUser = {
        _id: req.sessionID,
        name: '',
        collections: []
      }
      if (referrer) {
        newUser.referrer = referrer;
      }
      await db.get().collection('users').insertOne(newUser);
      req.session.isUserCreated = true;
      // if (referrer) {
      //   req.session.referrer = referrer;
      // }
    } catch(err) {
      next(err);
    }
  }
  next();
})

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']);
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.errors);

module.exports = app;