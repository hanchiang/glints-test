const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'han-glints',
  serializers: bunyan.stdSerializers
})

module.exports = log;