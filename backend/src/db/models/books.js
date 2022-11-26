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
  }, {
    hooks: {
      afterFind: async (instance, options) => {
        if (instance && instance.length) {
          for (let i of instance) {
            const data = await i.getCategories();
            i.dataValues.categories = data;
          }
        }
      }
    }
  });

  Book.associate = ({ Reservation }) => {
    Book.hasOne(Reservation, {
      as: "reservation",
      foreignKey: "bookId",
    });
  };

  return Book;
};