const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Book, Category } = require("../db/models");

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
  update: async (id, book) => {
    await Book.update({
      title: book.titulo,
      author: book.author,
      content: book.content
    }, {
      where: { id }
    });

    const updatedBook = await Book.findByPk(id);

    if (!updatedBook.content && book.categorias.includes(1)) throw { message: "Para escolher a categoria 'Escolha do editor', é necessario adicionar um content", statusCode: StatusCodes.BAD_REQUEST };

    await updatedBook.addCategories(book.categorias);

    return updatedBook;
  },
  destroy: async (id) => {
    const bookExist = await Book.findByPk(id);

    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };

    await Book.destroy({ where: { id } });
  }
};