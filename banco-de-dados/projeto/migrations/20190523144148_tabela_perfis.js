
exports.up = function(knex, Promise) {
  return knex.schema.createTable('perfis', table => {
      table.increments('id').primary()
      table.string('nome').notNull().unique()
      table.string('rotuno').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('perfis')
};
