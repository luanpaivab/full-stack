module.exports = {
    client: "mysql",
    connection: {
      database: "admin",
      user: "admin",
      host: "127.0.0.1",
      password: "admin",
      timezone: "-03:00",
      dateStrings: true
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  };
  