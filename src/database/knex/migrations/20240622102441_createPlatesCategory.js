exports.up = (knex) =>
  knex.schema.createTable("plates_category", (table) => {
    table.increments("id").primary()
    table.integer("plate_id").unsigned().references("id").inTable("plates")
    table.text("name")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("plates_category")
