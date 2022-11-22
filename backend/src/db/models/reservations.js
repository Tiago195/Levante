/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (Sequelize, DataTypes) => {
  const Reservation = Sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    returnPreview: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    timestamps: false
  })

  return Reservation;
}