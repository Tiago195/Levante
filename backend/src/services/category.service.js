const { Sequelize } = require("sequelize");
const { Category, Book } = require("../db/models");

module.exports = {
  getAll: async () => {
    const categories = await Category.findAll({
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("books.id")), "qtdBooks"]]
      },
      include: {
        as: "books",
        model: Book,
        attributes: [],
        through: { attributes: [] }
      },
      group: ["Category.id"],
    });

    console.log(await categories[1].countBooks());

    return categories;
  }
};