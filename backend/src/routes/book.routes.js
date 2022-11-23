const bookRouter = require("express").Router();

const controller = require("../controllers/book.controller");
const validBodyMiddleware = require("../middlewares/validBody.middleware");
const validTokenMiddleware = require("../middlewares/validToken.middleware");
const { bookCreateSchema, bookUpdatedSchema } = require("../utils/schemas");

bookRouter.get("/", controller.getAll);

bookRouter.post("/", validTokenMiddleware, validBodyMiddleware(bookCreateSchema), controller.create);

bookRouter.put("/:id", validTokenMiddleware, validBodyMiddleware(bookUpdatedSchema), controller.update);

bookRouter.delete("/:id", validTokenMiddleware, controller.destroy);

module.exports = bookRouter;