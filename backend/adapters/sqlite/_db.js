const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

exports.checkDBExist= function(dbDir){
  if (fs.existsSync(dbDir)) {
    return true;
  }
  return false;
}

exports.connectToDb = function (path, mode = 'readwrite') {
  return new Promise(function(resolve, reject) {
    const db = new sqlite3.Database(path, callback)
    function callback(err){
      if(err){
        console.log("connectToDb err", err);
        reject(err)
      }else{
        resolve(db);
      }
    }
  });
}

exports.queryToDb = function (db, query) {
  return new Promise((resolve,reject) => {
    db.all(query, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    });
  });
}
exports.run = function (db, query, dataArray) {
  return new Promise((resolve,reject) => {
    db.run(query, dataArray, function(err, result) {
      if (err) reject(err)
      resolve(this.lastID)
    });
  });
}
exports.insertRow = function (db, query, dataArray) {
  return new Promise((resolve,reject) => {
    db.run(query, dataArray, function(err) {
      if (err) reject(err)
      resolve(this.lastID)
    });
  });
}
exports.insertMultipleRows = function (db, transaction) {
  return new Promise((resolve,reject) => {
    try {
      db.serialize(()=> transaction(db))
    } catch(e) {
      return reject(e)
    }
    resolve(true)
  });
}

// close the database connection
exports.closeDb = function (db) {
  return new Promise((resolve,reject) => {
    db.close((err) => {
     if (err) {
      return reject(err);
     }
     resolve(true)
   });
  });
}
