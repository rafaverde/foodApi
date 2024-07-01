const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class OrdersController {
  async create(request, response) {
    const user = request.user

    response.json(user)
  }
}

module.exports = OrdersController
