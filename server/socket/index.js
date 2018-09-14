
exports.connect = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (client) => {
    console.log('client connected');

    client.on('join_room', (roomId, cb) => {
      client.join(roomId, () => {
        cb('Joined room: ' + roomId);
        client.to(roomId).emit('user_joined', 'A User joined the room!')
      })
    });
  });
}

