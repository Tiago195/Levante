module.exports = {
  /**
 * 
 * @param {import('sequelize').QueryInterface} queryInterface 
 * @param {import('sequelize')} Sequelize 
 */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Books',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      returnPreview: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};