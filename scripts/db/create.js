const mysql = require('mysql2');  

require('dotenv').config();

const { 
  CUT_SESSION_DB_USER, 
  CUT_SESSION_DB_PASS, 
  CUT_SESSION_DB_HOST,
  CUT_SESSION_DB_DEV_DB_NAME,
  CUT_SESSION_DB_PROD_DB_NAME,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development" 
  ? CUT_SESSION_DB_DEV_DB_NAME 
  : CUT_SESSION_DB_PROD_DB_NAME



const connection = mysql.createConnection({  
  host: CUT_SESSION_DB_HOST,  
  user: CUT_SESSION_DB_USER,  
  password: CUT_SESSION_DB_PASS  
});  

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    
    if (err && err.code === "ER_DB_CREATE_EXISTS") {
      console.log('Db already created');
      process.exit(0);
    } 
    
    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  })
})