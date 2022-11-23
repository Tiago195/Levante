const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  const { user } = req;
  const { userId } = req.body;

  if (user.isAdmin) return next();

  if (user.id == userId) return next();

  next({ message: "Não é permitido fazer reservas para outra pessoa", statusCode: StatusCodes.FORBIDDEN });
};