const { StatusCodes } = require("http-status-codes");
const token = require("../utils/token");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const { data } = token.decode(authorization);

    if (!data.isAdmin) next({ message: "Sem autorização", statusCode: StatusCodes.FORBIDDEN });

  } catch (error) {
    next(error);
  }

  next();
};