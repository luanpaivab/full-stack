exports.up = function(knex, Promise) {
    return knex.schema.createTable('contacts', table => {
        table.increments('id').primary()
        table.string('nome',100).notNull()
        table.string('celular',13).notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('contacts')
  };