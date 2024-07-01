const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users").where({ email }).first()

    if (checkUserExists) {
      throw new AppError("Já existe um usuário com este email!")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({ name, email, password: hashedPassword })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado!")
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first()

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
        throw new AppError("Este email já está sendo usado.")
      }
    }

    user.name = name ?? user.name

    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        "Você precisa digitar a senha antiga para definir uma nova!"
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere!")
      }

      user.password = await hash(password, 8)
    }

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    })

    return response.status(200).json()
  }
}

module.exports = UsersController
