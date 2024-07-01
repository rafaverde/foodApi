const { Router } = require("express")

const usersRouter = require("./users.routes")
const platesRouter = require("./plates.routes")
const platesCategoryRouter = require("./platescategory.routes")
const sessionsRouter = require("./sessions.routes")
const ordersRouter = require("./orders.routes")

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/plates", platesRouter)
routes.use("/categories", platesCategoryRouter)
routes.use("/orders", ordersRouter)

module.exports = routes
