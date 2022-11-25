const joiBase = require("joi");
const joiDate = require("@joi/date");

const joi = joiBase.extend(joiDate);

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
  categories: joi.array().items(joi.number().required()).required(),
  cover: joi.string().required(),
  resume: joi.string()
});

const bookUpdatedSchema = joi.object({
  title: joi.string().empty(),
  author: joi.string().empty(),
  categories: joi.array().items(joi.number().required()).messages({
    "array.length": ""
  }),
  resume: joi.string().allow("")
});

const today = new Date();
today.setDate(today.getDate() + 3);

const reservationCreateSchema = joi.object({
  userId: joi.number().required().messages({
    "any.required": "Usuário é obrigatorio.",

  }),
  bookId: joi.number().required().messages({
    "any.required": "Livro é obrigatorio.",
  }),
  returnPreview: joi.date().format("YYYY-MM-DD").min(today.toLocaleDateString()).required().messages({
    "date.format": "Formato esperado 'DD/MM/AAAA'",
    "date.min": "Prazo minimo de entrega é 3 dias depois da data de reserva."
  }),
});

module.exports = {
  userLoginSchema,
  userCreateSchema,
  bookCreateSchema,
  bookUpdatedSchema,
  reservationCreateSchema
};