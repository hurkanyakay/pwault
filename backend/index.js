
require('dotenv').config({path: '../.env'})
global.__base = __dirname + '/';
var _ = require('lodash');
global._ = _;

const adapter = require('./adapters/adapter');
global.DB = adapter();

process.on('uncaughtException', (err) => {
  console.log("err",err);
  process.exit(1);
});

const WebServer = require(__base + 'server')
new WebServer()
