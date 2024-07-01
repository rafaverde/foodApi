exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id").primary()
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    table.text("order_status").notNullable().defaultTo("Aguardando confirmação")
    table.text("items").notNullable()
    table.text("payment_status").notNullable().defaultTo("Aguardando aprovação")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable("orders")
