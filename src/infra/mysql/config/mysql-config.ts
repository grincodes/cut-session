/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const mysql = require('mysql2');

const {
  CUT_SESSION_DB_USER,
  CUT_SESSION_DB_PASS,
  CUT_SESSION_DB_HOST,
  CUT_SESSION_DB_DEV_DB_NAME,
  CUT_SESSION_DB_TEST_DB_NAME,
  CUT_SESSION_DB_PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const databaseCredentials = {
  development: {
    username: CUT_SESSION_DB_USER,
    password: CUT_SESSION_DB_PASS,
    database: CUT_SESSION_DB_DEV_DB_NAME,
    host: CUT_SESSION_DB_HOST,
    port: 3306,
  },
  test: {
    username: CUT_SESSION_DB_USER,
    password: CUT_SESSION_DB_PASS,
    database: CUT_SESSION_DB_TEST_DB_NAME,
    host: CUT_SESSION_DB_HOST,
    port: 3306,
  },
  production: {
    username: CUT_SESSION_DB_USER,
    password: CUT_SESSION_DB_PASS,
    database: CUT_SESSION_DB_PROD_DB_NAME,
    host: CUT_SESSION_DB_HOST,
    port: 3306,
  },
};

const { username, password, database, host, port } =
  databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

// create the connection to database

module.exports.connection = mysql.createConnection({
  host,
  user: username,
  database,
  password,
  port,
});
