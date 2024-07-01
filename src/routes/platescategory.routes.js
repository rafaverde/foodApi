const { Router } = require("express")

const PlatesCategoryController = require("../controllers/PlatesCategoryController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const platesCategoryRoutes = Router()

const platesCategoryController = new PlatesCategoryController()

platesCategoryRoutes.use(ensureAuthenticated)

platesCategoryRoutes.post("/", platesCategoryController.create)
platesCategoryRoutes.get("/", platesCategoryController.index)

module.exports = platesCategoryRoutes
