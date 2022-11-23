const { StatusCodes } = require("http-status-codes");
const { Reservation, User, Book } = require("../db/models");

module.exports = {
  create: async (reservation) => {
    const userExist = await User.findByPk(reservation.userId);
    if (!userExist) throw { message: "Usuario não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (userExist.isAdmin) throw { message: "Admins não podem fazer resevas", statusCode: StatusCodes.UNAUTHORIZED };

    const bookExist = await Book.findByPk(reservation.bookId);
    if (!bookExist) throw { message: "Livro não encontrado", statusCode: StatusCodes.NOT_FOUND };
    if (bookExist.status) throw { message: "Livro não esta disponivel", statusCode: StatusCodes.BAD_REQUEST };


    bookExist.set({ status: true });
    const newReservation = await Reservation.create(reservation);

    bookExist.save();
    return newReservation;
  },
};