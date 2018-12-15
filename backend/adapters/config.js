const fs = require('fs');

const config = {
  selectedDB: 'sqlite',
  sqlite: {
    accounts: {
      path: __base + 'datas/accounts.db',
      tableName: 'accounts',
      functions: __base + 'adapters/sqlite/accounts',
    },
    
  },
};

if(config.selectedDB === 'sqlite'){
  var datasPath = __base + 'datas';
  if (!fs.existsSync(datasPath)){
      fs.mkdirSync(datasPath);
  }
}
module.exports = config;
