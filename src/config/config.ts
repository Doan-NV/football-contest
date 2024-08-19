export default () => ({
  configDB: {
    connect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER_DATABASE,
    password: process.env.DB_PASSWORD,
    db_auth: process.env.DB_USER_DATABASE_AUTH,
    db_replica: process.env.DB_REPLICA,
    is_direct_connection: process.env.DB_DIRECT_CONNECTION,
  },
  optionDB: {
    useUnifiedTopology: true,
  },
});
