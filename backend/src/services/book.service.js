const { StatusCodes } = require("http-status-codes");
const { Book } = require("../db/models");



module.exports = {
  getAll: async () => { },
  create: async (book) => {
    const bookExist = await Book.findOne({ where: { title: book.title } });

    if (!book.content && book.categorias.includes(1)) throw { message: "Para escolher a categoria 'Escolha do editor', é necessario adicionar um content", statusCode: StatusCodes.BAD_REQUEST };

    if (bookExist) throw { message: "O Titulo ja existe", statusCode: StatusCodes.CONFLICT };

    const newBook = await Book.create(book);

    await newBook.addCategories(book.categorias);

    return newBook;
  },
  update: async () => { },
  destroy: async () => { }
};