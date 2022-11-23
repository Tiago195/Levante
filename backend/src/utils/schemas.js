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

const bookCreateSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  categorias: joi.array().items(joi.number().required()).required(),
  content: joi.string()
});

module.exports = {
  userLoginSchema,
  userCreateSchema,
  bookCreateSchema
};