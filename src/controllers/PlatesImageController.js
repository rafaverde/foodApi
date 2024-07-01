const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class PlatesImageController {
  async update(request, response) {
    const { id } = request.params
    const imageFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const plate = await knex("plates").where({ id }).first()

    if (!plate) {
      throw new AppError(
        "A alteração da imagem só pode ser feita por usuários autenticados.",
        401
      )
    }

    if (plate.image) {
      await diskStorage.deleteFile(plate.image, "plate")
    }

    // Sends filename and kind, that diferences the folder that will be saved
    const filename = await diskStorage.saveFile(imageFileName, "plate")
    plate.image = filename

    await knex("plates").where({ id }).update(plate)

    return response.json(plate)
  }
}

module.exports = PlatesImageController
