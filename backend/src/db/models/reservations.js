/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (Sequelize, DataTypes) => {
  const Reservation = Sequelize.define("Reservation", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    returnPreview: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    timestamps: false
  });

  Reservation.associate = ({ Book, User }) => {
    // User.belongsToMany(Book, {
    //   as: "books",
    //   through: Reservation,
    //   foreignKey: "userId",
    //   otherKey: "bookId"
    // });
    // Book.belongsToMany(User, {
    //   as: "users",
    //   through: Reservation,
    //   foreignKey: "bookId",
    //   otherKey: "userId"
    // });
    Reservation.belongsTo(Book, {
      as: "book",
      foreignKey: "bookId"
    });
    Reservation.belongsTo(User, {
      as: "user",
      foreignKey: "userId"
    });
  };

  return Reservation;
};