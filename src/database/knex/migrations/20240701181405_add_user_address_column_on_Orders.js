exports.up = (knex) =>
  knex.schema.alterTable("orders", (table) => {
    table.text("user_address")
  })

exports.down = (knex) =>
  knex.schema.table("orders", (table) => {
    table.dropColumn("user_address")
  })
