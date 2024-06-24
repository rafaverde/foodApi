exports.up = (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary()
    table
      .integer("plate_id")
      .unsigned()
      .references("id")
      .inTable("plates")
      .onDelete("CASCADE")
    table.text("name")
  })

exports.down = (knex) => knex.schema.dropTable("ingredients")
