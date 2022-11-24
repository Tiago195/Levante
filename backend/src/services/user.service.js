const { User, Reservation } = require("../db/models");
const by = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const token = require("../utils/token");
const { Op, Model } = require("sequelize");

module.exports = {
  login: async (user) => {
    const loged = await User.findOne({
      where: { email: user.email }
    });

    const isValidPassword = by.compareSync(user.password, loged.password);

    if (!isValidPassword) throw { message: "Email ou senha Inválido", statusCode: StatusCodes.BAD_REQUEST };

    return token.encode(loged.dataValues);
  },

  create: async (user) => {
    const userExist = await User.findOne({ where: { email: user.email } });

    if (userExist) throw { message: "Email em uso", statusCode: StatusCodes.CONFLICT };

    const newUser = await User.create(user);

    return newUser;
  },

  getAll: async (email = "") => {
    return User.findAll({ where: { email: { [Op.substring]: email } }, include: { as: "reservations", model: Reservation } });
  }
};