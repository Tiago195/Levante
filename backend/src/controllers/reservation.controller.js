const { StatusCodes } = require("http-status-codes");
const service = require("../services/reservation.service");

module.exports = {
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