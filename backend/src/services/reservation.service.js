const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Reservation, User, Book } = require("../db/models");

module.exports = {
  getAll: async ({ page = 0, order = "id", by = "ASC", bookId, userId, returnDate = "", createdAt }) => {
    const where = {};
    if (bookId) where.bookId = bookId;
    if (userId) where.userId = userId;
    if (returnDate != "") where.returnDate = { [returnDate === "true" ? Op.not : Op.is]: null };
    if (createdAt) where.createdAt = { [Op.startsWith]: createdAt };

    const reservations = await Reservation.findAll({
      where,
      include: [
        { as: "book", model: Book, attributes: ["title", "author", "capa"] },
        { as: "user", model: User, attributes: ["name", "email"] },
      ],
      attributes: { exclude: ["bookId", "userId"] },
      offset: page * 10,
      limit: 10,
      order: [[order, by]]
    });

    return reservations;
  },
  getByUserId: async (userId, { page = 0, order = "id", by = "ASC", bookId, returnDate = "", createdAt }) => {
    const where = { userId };
    if (bookId) where.bookId = bookId;
    if (returnDate != "") where.returnDate = { [returnDate === "true" ? Op.not : Op.is]: null };
    if (createdAt) where.createdAt = { [Op.startsWith]: createdAt };

    const reservations = await Reservation.findAll({
      where,
      include: {
        as: "book", model: Book, attributes: ["title", "author", "capa"]
      },
      attributes: { exclude: ["bookId", "userId"] },
      offset: page * 10,
      limit: 10,
      order: [[order, by]]
    });

    return reservations;
  },
  create: async (reservation) => {

    const userExist = await User.findByPk(reservation.userId);
    if (!userExist) throw { message: "Usuario não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (userExist.isAdmin) throw { message: "Admins não podem fazer resevas", statusCode: StatusCodes.UNAUTHORIZED };

    const bookExist = await Book.findByPk(reservation.bookId);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (bookExist.status) throw { message: "Livro não esta disponivel", statusCode: StatusCodes.BAD_REQUEST };


    bookExist.set({ status: true });
    const newReservation = await Reservation.create(reservation);

    bookExist.increment("lido", { by: 1 });
    bookExist.save();
    return newReservation;
  },
  finalize: async (id) => {
    const bookExist = await Book.findByPk(id);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };

    bookExist.set({ status: false });

    const [reservation] = await bookExist.getReservations({ where: { returnDate: null }, limit: 1 });

    if (!reservation) throw { message: "Reserva não encontrada", statusCode: StatusCodes.NOT_FOUND };

    reservation.set({ returnDate: new Date() });

    reservation.save();
    bookExist.save();
  }
};