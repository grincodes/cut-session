

const mysql = require('mysql2');
const { Tables } = require('../../../dist/core/infra/tables');

require('dotenv').config();

const {
  CUT_SESSION_DB_USER,
  CUT_SESSION_DB_PASS,
  CUT_SESSION_DB_HOST,
  CUT_SESSION_DB_DEV_DB_NAME,
  CUT_SESSION_DB_PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const dbName =
  NODE_ENV === 'development'
    ? CUT_SESSION_DB_DEV_DB_NAME
    : CUT_SESSION_DB_PROD_DB_NAME;

const merchantInit = ()=>{
  const connection = mysql.createConnection({
    host: CUT_SESSION_DB_HOST,
    user: CUT_SESSION_DB_USER,
    password: CUT_SESSION_DB_PASS,
    database: dbName
  });
  
  connection.connect((err) => {
    if (err) throw err;
    connection.query(
      `CREATE TABLE ${Tables.MERCHANTS} ( merchantId varchar(255), name varchar(255) NOT NULL, email varchar(255) NOT NULL unique,cityOfOperation varchar(255) NOT NULL, phoneNumber varchar(255) NOT NULL, metadata json, PRIMARY KEY ( merchantId )  )`,
      (err, result) => {
        if (err && err.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log('Table already created');
          process.exit(0);
        }
    
        if (err) {
          throw err;
        }
    
        console.log('Created table');
        process.exit(0);
      },
    );
  });
  
  
  
  
}

exports.merchantInit = merchantInit;
   