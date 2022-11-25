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
    readCount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    cover: DataTypes.STRING,
    resume: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Book.associate = ({ Reservation }) => {
    Book.hasOne(Reservation, {
      as: "reservation",
      foreignKey: "bookId",
    });
  };

  return Book;
};