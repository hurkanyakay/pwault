const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.WEBDEVPORT || '3000', 10);
