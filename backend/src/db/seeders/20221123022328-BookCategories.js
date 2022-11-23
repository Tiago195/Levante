const mock = require("./mocks/bookCategory");

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("BookCategories", mock);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("BookCategories", null, {});
  }
};
