module.exports = {
  async up(queryInterface, _Sequelize) {

    await queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name: "Ficção Científica"
      },
      {
        id: 2,
        name: "Humor"
      },
      {
        id: 3,
        name: "Infanto Juvenis"
      },
      {
        id: 4,
        name: "Jogos"
      },
      {
        id: 5,
        name: "Poesia"
      },
      {
        id: 6,
        name: "Escolha do editor"
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  }
};
