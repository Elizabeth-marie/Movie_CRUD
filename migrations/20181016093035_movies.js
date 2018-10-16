exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title').notNullable().defaultTo('')
    table.string('director').notNullable().defaultTo('')
    table.integer('year').notNullable()
    table.integer('rating').notNullable().defaultTo(0)
    table.string('poster_url')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}
