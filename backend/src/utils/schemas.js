const joi = require("joi");

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const userCreateSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  isAdmin: joi.boolean()
});

module.exports = {
  userLoginSchema,
  userCreateSchema
};