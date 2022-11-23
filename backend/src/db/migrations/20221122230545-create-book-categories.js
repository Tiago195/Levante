module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookCategories", {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Books",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Categories",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookCategories");
  }
};