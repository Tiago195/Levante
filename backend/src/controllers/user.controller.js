const { StatusCodes } = require("http-status-codes");
const service = require("../services/user.service");
require("express-async-errors");

module.exports = {
  login: async (req, res) => {
    const user = await service.login(req.body);

    res.status(StatusCodes.OK).json(user);
  },
  create: async (req, res) => {
    const user = await service.create(req.body);

    res.status(StatusCodes.CREATED).json(user);
  },
  getAll: async (req, res) => {
    const { email } = req.query;
    const users = await service.getAll(email);

    res.status(StatusCodes.OK).json(users);
  }
};