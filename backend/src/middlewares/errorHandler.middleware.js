module.exports = (er, req, res, next) => {
  if (er.statusCode) return res.status(er.statusCode).json({ message: er.message });
  res.status(500).json({ message: er.message });
};