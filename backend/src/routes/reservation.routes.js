const resevationRouter = require("express").Router();

const controller = require("../controllers/reservation.controller");
const validBodyMiddleware = require("../middlewares/validBody.middleware");
const validCreationReservationMiddleware = require("../middlewares/validCreationReservation.middleware");
const TokemMiddleware = require("../middlewares/validToken.middleware");
const { reservationCreateSchema } = require("../utils/schemas");

resevationRouter.get("/", TokemMiddleware.user, controller.getAll);

resevationRouter.post("/",
  TokemMiddleware.user,
  validCreationReservationMiddleware,
  validBodyMiddleware(reservationCreateSchema),
  controller.create
);

resevationRouter.patch("/:id", TokemMiddleware.admin, controller.finalize);

module.exports = resevationRouter;