const {
  checkDBExist,
  connectToDb,
  queryToDb,
  insertRow,
  insertMultipleRows,
  run,
  closeDb
} = require(__base + 'adapters/sqlite/_db');

async function createAccountTables(dir,tableName){
  const sql = `
    CREATE TABLE IF NOT EXISTS
    ${tableName} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date INTEGER NOT NULL,
      name TEXT UNIQUE,
      username TEXT,
      email TEXT,
      password TEXT,
      website TEXT,
      favicon TEXT,
      additional TEXT
    );
  `;
  var db = await connectToDb(dir)
  var result = await queryToDb(db, sql)
  await closeDb(db)
  return result;
}
exports.fetchSingleAccount = function(dir,tableName){
  return async function(id){
    if(!checkDBExist(dir)){
      await createAccountTables(dir, tableName)
    }
    const sql = `SELECT * from ${tableName} WHERE id = ${id}`;
    var db = await connectToDb(dir);
    var result = await queryToDb(db, sql);
    await closeDb(db);
    return result[0];
  }
}
exports.fetchAllAccounts = function(dir, tableName){
  return async function(){
    if(!checkDBExist(dir)){
      await createAccountTables(dir, tableName)
    }
    const sql = `SELECT * from ${tableName} ORDER BY name`
    var db = await connectToDb(dir);
    var result = await queryToDb(db, sql);
    await closeDb(db);
    return result;
  }
}
exports.insertAccount = function(dir, tableName){
  return async function(account){
    if(!checkDBExist(dir)){
      await createAccountTables(dir, tableName)
    }
    let placeholders = Object.keys(account).map((field) => '?').join(',');
    const sql = `INSERT INTO ${tableName} VALUES (${placeholders})`
    var db = await connectToDb(dir);
    var result = await insertRow(db, sql, Object.values(account));
    await closeDb(db);
    return result;
  }
}
exports.updateAccount = function(dir, tableName){
  return async function(data){
    if(!checkDBExist(dir)){
      await createAccountTables(dir, tableName)
    }
    const sql = `UPDATE ${tableName} SET name = ?, date = ?, username = ?, email=?, password=?, website=?, favicon=?, additional=? WHERE id = ?`
    const array = [data.name, new Date(), data.username, data.email, data.password, data.website, data.favicon, data.additional, data.id]
    var db = await connectToDb(dir);
    var result = await run(db, sql, array);
    await closeDb(db);
    return result;
  }
}
exports.deleteAccount = function(dir, tableName){
  return async function(data){
    if(!checkDBExist(dir)){
      await createAccountTables(dir, tableName)
    }
    const sql = `DELETE from ${tableName} WHERE id = ${data.id}`
    var db = await connectToDb(dir);
    var result = await queryToDb(db, sql);
    await closeDb(db);
    return result;
  }
}
