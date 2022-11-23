const userRouter = require("express").Router();

const controller = require("../controllers/user.controller");
const validBodyMiddleware = require("../middlewares/validBody.middleware");
const validTokenMiddleware = require("../middlewares/validToken.middleware");
const { userLoginSchema, userCreateSchema } = require("../utils/schemas");

userRouter.post("/login", validBodyMiddleware(userLoginSchema), controller.login);
userRouter.post("/", validTokenMiddleware, validBodyMiddleware(userCreateSchema), controller.create);

module.exports = userRouter;