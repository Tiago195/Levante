const categoryRouter = require("express").Router();

const controller = require("../controllers/category.controller");

categoryRouter.get("/", controller.getAll);

module.exports = categoryRouter;