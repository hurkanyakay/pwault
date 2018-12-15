const config = require('./config');

module.exports = function databaseConnection(selectedDB){
  if(!selectedDB){
    selectedDB = config.selectedDB
  }
  const dbOptions = config[selectedDB]
  var obj = {}
  Object.keys(dbOptions).forEach((fn)=>{
    const functionList = require(dbOptions[fn].functions);
    Object.keys(functionList).forEach((key)=>{
      obj[key]= functionList[key](dbOptions[fn].path, dbOptions[fn].tableName)
    })
  })
  return obj;
}
