const { Router } = require("express")

const PlatesController = require("../controllers/PlatesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const platesRoutes = Router()

const platesController = new PlatesController()

platesRoutes.use(ensureAuthenticated)

platesRoutes.get("/", platesController.index)
platesRoutes.post("/", platesController.create)
platesRoutes.get("/:id", platesController.show)
platesRoutes.delete("/:id", platesController.delete)
platesRoutes.put("/:id", platesController.update)

module.exports = platesRoutes
