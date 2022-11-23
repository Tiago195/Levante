const mock = require("./mocks/books");

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("Books", mock.map((e, i) => ({ ...e, id: i + 1 })));
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Books", null, {});
  }
};
