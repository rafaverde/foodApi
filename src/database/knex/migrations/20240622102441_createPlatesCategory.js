exports.up = (knex) =>
  knex.schema.createTable("plates_category", (table) => {
    table.increments("id").primary()
    table.integer("user_id").unsigned().references("id").inTable("users")
    table.text("name")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("plates_category")
