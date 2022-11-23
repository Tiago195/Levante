/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (Sequelize, DataTypes) => {
  const BookCategory = Sequelize.define("BookCategory", {
    bookId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false
  });

  BookCategory.associate = ({ Book, Category }) => {
    Book.belongsToMany(Category, {
      as: "categories",
      through: BookCategory,
      foreignKey: "bookId",
      otherKey: "categoryId"
    });
    Category.belongsToMany(Book, {
      as: "books",
      through: BookCategory,
      foreignKey: "categoryId",
      otherKey: "bookId"
    });
  };

  return BookCategory;
};