const resevationRouter = require("express").Router();

const controller = require("../controllers/reservation.controller");
const validBodyMiddleware = require("../middlewares/validBody.middleware");
const validTokenMiddleware = require("../middlewares/validToken.middleware");
const { reservationCreateSchema } = require("../utils/schemas");

resevationRouter.post("/", validTokenMiddleware, validBodyMiddleware(reservationCreateSchema), controller.create);

resevationRouter.patch("/:id", validTokenMiddleware, controller.finalize);


module.exports = resevationRouter;