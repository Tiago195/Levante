const { StatusCodes } = require("http-status-codes");
const service = require("../services/reservation.service");

module.exports = {
  getAll: async (req, res) => {
    const { isAdmin, id } = req.user;

    const reservations = isAdmin ? await service.getAll(req.query) : await service.getByUserId(id, req.query);

    res.status(StatusCodes.OK).json(reservations);
  },
  getAllPendencies: async (req, res) => {
    const pendencies = await service.getAllPendencies();

    res.status(StatusCodes.OK).json(pendencies);
  },
  create: async (req, res) => {
    const { user } = req;
    const reservation = await service.create(req.body, user.isAdmin);

    res.status(StatusCodes.CREATED).json(reservation);
  },
  patch: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    await service.patch(id, status);

    res.status(StatusCodes.NO_CONTENT).end();
  },
};