require('dotenv').config();

const app = require('./app');
const db = require('./db');
const logger = require('./utils/logger');

const server = require('http').createServer(app);

const importData = require('./utils/importData');

const port = 3000;

db.connect()
  .then(() => {
    require('./socket').connect(server);
    server.listen(port, () => {
      logger.info('Express is running on port: ' + port);
      importData();
    })
  });