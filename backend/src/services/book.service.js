const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Book, Category, Reservation } = require("../db/models");

module.exports = {
  getAll: async ({ title = "", author = "", page = 0, order = "id", by = "ASC", category = "" }) => {
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        },
        author: {
          [Op.like]: `%${author}%`
        }
      },
      offset: page * 10,
      limit: 10,
      order: [
        [order, by]
      ],
      include: [
        { as: "categories", model: Category, attributes: ["name"], where: { name: category }, through: { attributes: [] } }
      ]
    });

    return books;
  },
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