const { StatusCodes } = require("http-status-codes");
const token = require("../utils/token");

module.exports = {
  admin: (req, res, next) => {
    const { authorization } = req.headers;

    try {
      const { data } = token.decode(authorization);

      if (!data.isAdmin) next({ message: "Sem autorização", statusCode: StatusCodes.FORBIDDEN });

    } catch (error) {
      next(error);
    }

    next();
  },
  user: (req, res, next) => {
    const { authorization } = req.headers;

    try {
      const { data } = token.decode(authorization);

      req.user = data;
    } catch (error) {
      next(error);
    }

    next();
  }
};