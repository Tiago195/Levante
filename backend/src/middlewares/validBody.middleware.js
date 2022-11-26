const { StatusCodes } = require("http-status-codes");
const { messages } = require("joi-translation-pt-br");

module.exports = (schema) => (req, res, next) => {
  console.log(req.body);
  const { error } = schema.validate(req.body, { messages });

  if (error) next({ message: error.message, statusCode: StatusCodes.BAD_REQUEST });

  next();
};