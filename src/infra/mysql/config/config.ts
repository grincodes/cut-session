function dbCon() {
  const {
    CUT_SESSION_DB_USER,
    CUT_SESSION_DB_PASS,
    CUT_SESSION_DB_HOST,
    CUT_SESSION_DB_DEV_DB_NAME,
    CUT_SESSION_DB_TES_DB_NAME,
    CUT_SESSION_DB_PROD_DB_NAME,
    NODE_ENV,
  } = process.env;

  const databaseCredentials = {
    development: {
      user: CUT_SESSION_DB_USER,
      password: CUT_SESSION_DB_PASS,
      database: CUT_SESSION_DB_DEV_DB_NAME,
      host: CUT_SESSION_DB_HOST,
      port: 3306,
    },
    test: {
      user: CUT_SESSION_DB_USER,
      password: CUT_SESSION_DB_PASS,
      database: CUT_SESSION_DB_TES_DB_NAME,
      host: CUT_SESSION_DB_HOST,
      port: 3306,
    },
    production: {
      user: CUT_SESSION_DB_USER,
      password: CUT_SESSION_DB_PASS,
      database: CUT_SESSION_DB_PROD_DB_NAME,
      host: CUT_SESSION_DB_HOST,
      port: 3306,
    },
  };

  

  return databaseCredentials[NODE_ENV];
}
export default () => ({
  database: {
    ...dbCon(),
  },
});
