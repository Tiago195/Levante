const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const { Reservation, User, Book } = require("../db/models");

module.exports = {
  getAll: async (isAdmin, userId, { page = 0, order = "id", by = "ASC", title = "", email = "", status = "", createdAt }) => {
    const where = {};
    if (!isAdmin) where.userId = userId;
    if (status) where.status = status;
    if (createdAt) where.createdAt = { [Op.startsWith]: createdAt };

    const reservations = await Reservation.findAll({
      where,
      include: [
        { as: "book", model: Book, where: { title: { [Op.substring]: title } }, attributes: ["title", "author", "cover", "id"] },
        { as: "user", model: User, where: { email: { [Op.startsWith]: email } }, attributes: ["name", "email"] },
      ],
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
          { status: "Reading" },
        ]
      },
      include: [
        { as: "book", model: Book, attributes: ["title", "author", "cover", "id"] },
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

    bookExist.increment("readCount", { by: 1 });
    bookExist.save();
    return newReservation;
  },
  patch: async (id, status) => {
    const bookExist = await Book.findByPk(id);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };

    const reservation = await bookExist.getReservation({ where: { status: status === "Finished" ? "Reading" : "Pending" } });

    if (!reservation) throw { message: "Reserva não encontrada", statusCode: StatusCodes.NOT_FOUND };

    if (status === "Finished" || status === "Denied") {
      bookExist.set({ status: false });
      reservation.set({ returnDate: new Date() });
    }
    reservation.set({ status });

    reservation.save();
    bookExist.save();
  }
};