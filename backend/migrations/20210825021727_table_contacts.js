exports.up = function (knex, Promise) {
    return knex.schema.createTable('contacts', table => {
      table.increments('id').primary();
      table.string('nome',200).notNull();
      table.string('celular',20).notNull();
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable("contacts");
  };