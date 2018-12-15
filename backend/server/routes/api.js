var Accounts = require('./accounts')
var Login = require('./login')

module.exports = function(app) {
  app.use('/api/accounts', Accounts)
  app.use('/api/login', Login)
}
