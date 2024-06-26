const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class PlatesCategoryController {
  async create(request, response) {
    const { category } = request.body
    const { user_id } = request.params

    const checkCategoryExists = await knex("plates_category")
      .where({
        name: category,
      })
      .first()

    if (!checkCategoryExists) {
      await knex("plates_category").insert({
        user_id,
        name: category,
      })
    } else {
      throw new AppError("Categoria já existe!")
    }

    response.json()
  }
}

module.exports = PlatesCategoryController
