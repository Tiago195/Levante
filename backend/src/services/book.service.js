const { StatusCodes } = require("http-status-codes");
const { Book } = require("../db/models");

module.exports = {
  getAll: async () => { },
  create: async (book) => {
    const bookExist = await Book.findOne({ where: { title: book.title } });

    if (bookExist) throw { message: "O Titulo ja existe", statusCode: StatusCodes.CONFLICT };

    const newBook = await Book.create(book);

    return newBook;
  },
  update: async () => { },
  destroy: async () => { }
};