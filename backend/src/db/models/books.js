/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (Sequelize, DataTypes) => {
  const Book = Sequelize.define("Book", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    lido: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    capa: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Book.associate = ({ Reservation }) => {
    Book.hasMany(Reservation, {
      as: "reservations",
      foreignKey: "bookId",
    });
  };

  return Book;
};