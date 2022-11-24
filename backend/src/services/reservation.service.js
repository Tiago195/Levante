const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Reservation, User, Book } = require("../db/models");

module.exports = {
  getAll: async ({ page = 0, order = "id", by = "ASC", bookId, userId, status = "", createdAt }) => {
    const where = {};
    if (bookId) where.bookId = bookId;
    if (userId) where.userId = userId;
    // if (returnDate != "") where.returnDate = { [returnDate === "true" ? Op.not : Op.is]: null };
    if (status) where.status = status;
    if (createdAt) where.createdAt = { [Op.startsWith]: createdAt };

    const reservations = await Reservation.findAll({
      where,
      include: [
        { as: "book", model: Book, attributes: ["title", "author", "capa", "id"] },
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
  getAllPendencies: async () => {
    const pendencies = await Reservation.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { returnPreview: { [Op.lt]: new Date() } },
              { returnDate: null }
            ]
          },
          { status: "Pending" },
        ]
      },
      include: [
        { as: "book", model: Book, attributes: ["title", "author", "capa", "id"] },
        { as: "user", model: User, attributes: ["name", "email"] },
      ],
    });

    return pendencies;
  },
  create: async (reservation, isAdmin) => {

    const userExist = await User.findByPk(reservation.userId);
    if (!userExist) throw { message: "Usuario não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (userExist.isAdmin) throw { message: "Admins não podem fazer resevas", statusCode: StatusCodes.UNAUTHORIZED };

    const bookExist = await Book.findByPk(reservation.bookId);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (bookExist.status) throw { message: "Livro não esta disponivel", statusCode: StatusCodes.BAD_REQUEST };


    bookExist.set({ status: true });
    const newReservation = await Reservation.create({ ...reservation, status: isAdmin ? "Reading" : "Pending" });

    bookExist.increment("lido", { by: 1 });
    bookExist.save();
    return newReservation;
  },
  patch: async (id, status) => {
    const bookExist = await Book.findByPk(id);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };

    if (status === "Finished") bookExist.set({ status: false });

    const reservation = await bookExist.getReservation({ where: { status: status === "Finished" ? "Reading" : "Pending" } });

    if (!reservation) throw { message: "Reserva não encontrada", statusCode: StatusCodes.NOT_FOUND };

    reservation.set({ returnDate: new Date(), status });

    reservation.save();

    bookExist.save();
  }
};