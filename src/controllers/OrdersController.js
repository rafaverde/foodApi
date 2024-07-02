const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id
    const { items } = request.body

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("É necessário estar logado para fazer um pedido.")
    }

    const itemsInsert = items.toString()

    if (!itemsInsert) {
      throw new AppError("É necessário inserir pelo menos um item do cardápio!")
    }

    if (!user.address) {
      throw new AppError(
        "É necessário um endereço cadastrado! Acesse seu perfil e atualize seus dados."
      )
    }

    await knex("orders").insert({
      user_id,
      items: itemsInsert,
      user_address: user.address,
    })

    return response.json()
  }

  async update(request, response) {
    const { order_status, items, payment_status } = request.body
    const { id } = request.params

    const order = await knex("orders").where({ id }).first()
    const itemsInsert = items ? items.toString() : order.items

    if (order_status === "" || items === "" || payment_status === "") {
      throw new AppError(
        "Dados em branco não são permitidos, escolha ou digite algum valor."
      )
    }

    order.order_status = order_status ?? order.order_status
    order.items = itemsInsert ?? order.items
    order.payment_status = payment_status ?? order.payment_status

    await knex("orders").where({ id }).update({
      order_status: order.order_status,
      items: order.items,
      payment_status: order.payment_status,
      updated_at: knex.fn.now(),
    })

    response.json().status(200)
  }

  async show(request, response) {
    const { id } = request.params

    const order = await knex("orders").where({ id }).first()

    response.json({ order })
  }

  async index(request, response) {
    const user_id = request.user.id

    const orders = await knex("orders")
      .where({ user_id })
      .orderBy("updated_at", "desc")

    response.json({ orders })
  }
}

module.exports = OrdersController
