

const mysql = require('mysql2');
const {Tables} = require('../../../dist/core/infra/tables');
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

const connection = mysql.createConnection({
  host: CUT_SESSION_DB_HOST,
  user: CUT_SESSION_DB_USER,
  password: CUT_SESSION_DB_PASS,
  database: dbName
});

const bookingSessionInit = ()=> {
    connection.connect((err) => {
        if (err) throw err;
        connection.query(
          ` CREATE VIEW bookingsession AS
                SELECT ${Tables.BOOKINGS}.bookingId,
                ${Tables.BOOKINGS}.userId,${Tables.BOOKINGS}.sessionId,
                ${Tables.BOOKINGS}.date,${Tables.SESSIONS}.startsAt,
                ${Tables.SESSIONS}.endsAt,${Tables.BOOKINGS}.notes,
                ${Tables.BOOKINGS}.title,${Tables.SESSIONS}.merchantId,
                ${Tables.MERCHANTS}.cityOfOperation, ${Tables.MERCHANTS}.name
            FROM 
            ${Tables.BOOKINGS}, ${Tables.SESSIONS} , ${Tables.MERCHANTS} 
            WHERE ${Tables.BOOKINGS}.sessionId = ${Tables.SESSIONS}.sessionId
            AND ${Tables.SESSIONS}.merchantId = ${Tables.MERCHANTS}.merchantId;
             `,
          (err, result) => {
            if (err && err.code === 'ER_TABLE_EXISTS_ERROR') {
              console.log('view already created');
              process.exit(0);
            }
        
            if (err) {
              throw err;
            }
        
            console.log('View Created');
            process.exit(0);
          },
        );
      });
}


exports.bookingSessionInit = bookingSessionInit

