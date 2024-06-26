const { Router } = require("express")

const usersRouter = require("./users.routes")
const platesRouter = require("./plates.routes")
const platesCategoryRouter = require("./platescategory.routes")

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/plates", platesRouter)
routes.use("/categories", platesCategoryRouter)

module.exports = routes
