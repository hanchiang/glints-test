require('dotenv').config();

const app = require('./app');
const db = require('./db');
const importData = require('./utils/importData');

const port = 3000;

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log('Express is running on port: ' + port);
      importData();
    })
  })

