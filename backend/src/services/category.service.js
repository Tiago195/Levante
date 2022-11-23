const { Category } = require("../db/models");

module.exports = {
  getAll: async () => {
    const categories = await Category.findAll();

    return categories;
  }
};