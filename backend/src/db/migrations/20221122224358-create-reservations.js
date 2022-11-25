module.exports = {
  /**
 * 
 * @param {import('sequelize').QueryInterface} queryInterface 
 * @param {import('sequelize')} Sequelize 
 */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Books",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      returnPreview: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      returnDate: {
        type: Sequelize.DATE
      },
      // Pending | Finished | Reading | Denied
      status: {
        type: Sequelize.STRING,
        defaultValue: "Pending"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservations");
  }
};