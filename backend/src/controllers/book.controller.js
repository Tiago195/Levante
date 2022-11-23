const { StatusCodes } = require("http-status-codes");
const service = require("../services/book.service");

module.exports = {
  getAll: async () => { },
  create: async (req, res) => {
    const book = await service.create(req.body);

    res.status(StatusCodes.CREATED).json(book);
  },
  update: async () => { },
  destroy: async () => { }
};