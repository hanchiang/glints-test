require('dotenv').config();

const app = require('./app');
const db = require('./db');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const importData = require('./utils/importData');

const port = 3000;

db.connect()
  .then(() => {
    server.listen(port, () => {
      console.log('Express is running on port: ' + port);
      importData();
    })
  });

io.on('connection', function (client) {
  console.log('Client connected...');
  console.log(client.id);

  client.on('test', (data, cb) => {
    console.log('Received from client: ' + data);
    cb('Good stuff bro');
  })
});


