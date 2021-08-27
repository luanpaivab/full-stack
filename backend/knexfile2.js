module.exports = {
    client: 'postgresql',
    connection: {
      database: 'admin',
      user:     'admin',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
  };
  