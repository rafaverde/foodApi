exports.up = (knex) =>
  knex.schema.createTable("plates", (table) => {
    table.increments("id").primary()
    table.integer("user_id").unsigned().references("id").inTable("users")
    table.text("image").nullable().defaultTo(null)
    table.text("name")
    table.text("description")
    table
      .text("category")
      .unsigned()
      .references("name")
      .inTable("plates_category")
    table.decimal("price", 3, 2).defaultTo(0)
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("plates")
