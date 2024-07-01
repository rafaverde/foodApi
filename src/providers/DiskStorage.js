const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file, kind) {
    if (kind === "avatar") {
      await fs.promises.rename(
        path.resolve(uploadConfig.TMP_FOLDER, file),
        path.resolve(uploadConfig.AVATAR_UPLOADS_FOLDER, file)
      )
    } else if (kind === "plate") {
      await fs.promises.rename(
        path.resolve(uploadConfig.TMP_FOLDER, file),
        path.resolve(uploadConfig.PLATES_UPLOADS_FOLDER, file)
      )
    }

    return file
  }

  async deleteFile(file, kind) {
    let filePath

    if (kind === "avatar") {
      filePath = path.resolve(uploadConfig.AVATAR_UPLOADS_FOLDER, file)
    } else if (kind === "plate") {
      filePath = path.resolve(uploadConfig.PLATES_UPLOADS_FOLDER, file)
    }

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
