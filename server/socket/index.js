const logger = require('../utils/logger');


exports.connect = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (client) => {
    logger.info('socket client connected');

    client.on('join_room', (roomId, cb) => {
      client.join(roomId, () => {
      })
    });

    // update collection name | add store to collection | delete store from collection
    client.on('update_collection', () => {
      const rooms = Object.keys(client.rooms);
      logger.info('emit collection updated to: ' + rooms[1]);
      client.to(rooms[1]).emit('collection_updated');
    })
  });
}

