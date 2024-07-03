const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const checkIfItsAFile = request.file
    const avatarFileName = checkIfItsAFile ? request.file.filename : null

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
    if (avatarFileName !== null) {
      const filename = await diskStorage.saveFile(avatarFileName, "avatar")
      user.avatar = filename
    } else {
      user.avatar = null
    }

    await knex("users").where({ id: user_id }).update(user)

    return response.json(user)
  }
}

module.exports = UserAvatarController
