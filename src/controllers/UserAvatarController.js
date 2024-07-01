const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError(
        "A alteração da imagem só pode ser feita por usuários autenticados.",
        401
      )
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar, "avatar")
    }

    // Sends filename and kind, that diferences the folder that will be saved
    const filename = await diskStorage.saveFile(avatarFileName, "avatar")
    user.avatar = filename

    await knex("users").where({ id: user_id }).update(user)

    return response.json(user)
  }
}

module.exports = UserAvatarController
