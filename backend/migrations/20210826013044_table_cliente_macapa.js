exports.up = function (knex, Promise) {
    return knex.schema.createTable('cliente', table => {
      table.increments('id').primary();
      table.string('nome').notNull();
      table.string('password').notNull();
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable("cliente");
  };