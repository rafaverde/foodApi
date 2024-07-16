const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UsersValidatedController {
  async index(request, response) {
    const { id } = request.user

    const checkUserExists = await knex("users").where({ id }).first()

    if (checkUserExists.lenght === 0) {
      throw new AppError("Unauthorized", 401)
    }

    return response.status(200).json()
  }
}

module.exports = UsersValidatedController
