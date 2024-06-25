const knex = require("../database/knex")

class PlatesController {
  async create(request, response) {
    const { image, name, description, ingredients, price, category } =
      request.body

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
    }

    const categoryInfo = await knex("plates_category").where({
      name: category,
    })

    const [plate_id] = await knex("plates").insert({
      user_id,
      image,
      name,
      description,
      category_id: categoryInfo[0].id,
      category_name: categoryInfo[0].name,
      price,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        plate_id,
        name,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const plate = await knex("plates").where({ id }).first()
    const ingredients = await knex("ingredients")
      .where({ plate_id: id })
      .orderBy("name")

    response.json({ ...plate, ingredients })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("plates").where({ id }).delete()

    response.json()
  }

  //Listar os pratos da categoria
  async index(request, response) {
    const { category_id } = request.query

    const plates = await knex("plates").where({ category_id }).orderBy("name")

    return response.json(plates)
  }
}

module.exports = PlatesController
