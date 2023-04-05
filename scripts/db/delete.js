const mysql = require('mysql2');  

require('dotenv').config();

const { 
  CUT_SESSION_DB_USER, 
  CUT_SESSION_DB_PASS, 
  CUT_SESSION_DB_HOST,
  CUT_SESSION_DB_DEV_DB_NAME,
  CUT_SESSION_DB_TEST_DB_NAME,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development" 
  ? CUT_SESSION_DB_DEV_DB_NAME 
  : CUT_SESSION_DB_TEST_DB_NAME;

const connection = mysql.createConnection({  
  host: CUT_SESSION_DB_HOST,  
  user: CUT_SESSION_DB_USER,  
  password: CUT_SESSION_DB_PASS 
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`DROP SCHEMA ${dbName}`, (err, result) => {
    if (err && err.code === "ER_DB_DROP_EXISTS") {
      console.log("Already deleted");
      process.exit(0);
    }

    if (err) throw err;

    console.log('Deleted db');
    process.exit(0);
  })
})