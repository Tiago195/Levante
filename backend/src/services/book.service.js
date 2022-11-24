const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Book, Category } = require("../db/models");

module.exports = {
  getAll: async ({ title = "", author = "", page = 0, order = "id", by = "ASC", category = "", status = "" }) => {
    const isAvailable = status != "" ? { status: status === "true" } : {};

    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        },
        author: {
          [Op.like]: `%${author}%`
        },
        ...isAvailable
      },
      offset: page * 10,
      limit: 10,
      order: [
        [order, by]
      ],
      include: [
        { as: "categories", model: Category, where: { name: { [Op.substring]: category } }, through: { attributes: [] } }
      ]
    });

    return books;
  },
  create: async (book) => {
    const bookExist = await Book.findOne({ where: { title: book.title } });

    if (!book.content && book.categories.includes(1)) throw { message: "Para escolher a categoria 'Escolha do editor', é necessario adicionar um content", statusCode: StatusCodes.BAD_REQUEST };

    if (bookExist) throw { message: "O Titulo ja existe", statusCode: StatusCodes.CONFLICT };

    const newBook = await Book.create(book);

    await newBook.addCategories(book.categories);

    return newBook;
  },
  update: async (id, book) => {
    await Book.update(book, {
      where: { id }
    });

    const updatedBook = await Book.findByPk(id);

    if (!updatedBook.content && book.categories.includes(1)) throw { message: "Para escolher a categoria 'Escolha do editor', é necessario adicionar um content", statusCode: StatusCodes.BAD_REQUEST };

    await updatedBook.setCategories(book.categories);

    return updatedBook;
  },
  destroy: async (id) => {
    const bookExist = await Book.findByPk(id);

    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };

    await Book.destroy({ where: { id } });
  }
};