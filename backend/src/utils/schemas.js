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
  capa: joi.string().required(),
  content: joi.string()
});

const bookUpdatedSchema = joi.object({
  titulo: joi.string(),
  author: joi.string(),
  categorias: joi.array().items(joi.number().required()),
  content: joi.string()
});

const reservationCreateSchema = joi.object({
  userId: joi.number().required(),
  bookId: joi.number().required(),
  returnPreview: joi.date().required(),
});

module.exports = {
  userLoginSchema,
  userCreateSchema,
  bookCreateSchema,
  bookUpdatedSchema,
  reservationCreateSchema
};