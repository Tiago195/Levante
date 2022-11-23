const bookRouter = require("express").Router();

const controller = require("../controllers/book.controller");
const validBodyMiddleware = require("../middlewares/validBody.middleware");
const TokemMiddleware = require("../middlewares/validToken.middleware");
const { bookCreateSchema, bookUpdatedSchema } = require("../utils/schemas");

bookRouter.get("/", controller.getAll);

bookRouter.post("/", TokemMiddleware.admin, validBodyMiddleware(bookCreateSchema), controller.create);

bookRouter.put("/:id", TokemMiddleware.admin, validBodyMiddleware(bookUpdatedSchema), controller.update);

bookRouter.delete("/:id", TokemMiddleware.admin, controller.destroy);

module.exports = bookRouter;