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

  async index(request, response) {
    const { user_id, plate_name, ingredients } = request.query

    let plate

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())

      plate = await knex("ingredients")
        .select(
          "plates.id",
          "plates.name",
          "plates.user_id",
          "plates.category_id",
          "plates.category_name"
        )
        // .where("plates.user_id", user_id)
        .whereLike("plates.name", `%${plate_name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("plates", "plates.id", "ingredients.plate_id")
    } else {
      plate = await knex("plates")
        // .where({ user_id })
        .orderBy("name")
        .whereLike("name", `%${plate_name}%`)
    }

    response.json({ plate })
  }
}

module.exports = PlatesController
