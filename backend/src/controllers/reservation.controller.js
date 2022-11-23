const { StatusCodes } = require("http-status-codes");
const service = require("../services/reservation.service");

module.exports = {
  getAll: async (req, res) => {
    const { isAdmin, id } = req.user;

    const reservations = isAdmin ? await service.getAll(req.query) : await service.getByUserId(id, req.query);

    res.status(StatusCodes.OK).json(reservations);
  },
  create: async (req, res) => {
    const reservation = await service.create(req.body);

    res.status(StatusCodes.CREATED).json(reservation);
  },
  finalize: async (req, res) => {
    const { id } = req.params;

    await service.finalize(id);

    res.status(StatusCodes.NO_CONTENT).end();
  }
};