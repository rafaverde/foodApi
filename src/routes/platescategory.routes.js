const { Router } = require("express")

const PlatesCategoryController = require("../controllers/PlatesCategoryController")

const platesCategoryRoutes = Router()

const platesCategoryController = new PlatesCategoryController()

platesCategoryRoutes.post("/:user_id", platesCategoryController.create)
platesCategoryRoutes.get("/", platesCategoryController.index)

module.exports = platesCategoryRoutes
