const { StatusCodes } = require("http-status-codes");
const service = require("../services/category.service");

module.exports = {
  getAll: async (req, res) => {
    const categories = await service.getAll();

    res.status(StatusCodes.OK).json(categories);
  }
};