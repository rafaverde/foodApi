const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const PlatesController = require("../controllers/PlatesController")
const PlatesImageController = require("../controllers/PlatesImageController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const platesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController()
const platesImageController = new PlatesImageController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.get("/", platesController.index)
platesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  platesController.create
)
platesRoutes.get("/:id", platesController.show)
platesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  platesController.delete
)
platesRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  platesController.update
)

platesRoutes.patch(
  "/image/:id",
  verifyUserAuthorization(["admin"]),
  ensureAuthenticated,
  upload.single("image"),
  platesImageController.update
)

module.exports = platesRoutes
