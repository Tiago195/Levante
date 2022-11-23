const { StatusCodes } = require("http-status-codes");
const service = require("../services/book.service");

module.exports = {
  getAll: async (req, res) => {
    const books = await service.getAll(req.query);

    res.status(StatusCodes.OK).json(books);
  },
  create: async (req, res) => {
    const book = await service.create(req.body);

    res.status(StatusCodes.CREATED).json(book);
  },
  update: async (req, res) => {
    const { id } = req.params;

    const book = await service.update(id, req.body);

    res.status(StatusCodes.OK).json(book);
  },
  destroy: async () => { }
};