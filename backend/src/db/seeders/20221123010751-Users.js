module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "ADM",
        email: "admin@admin.com",
        // password: "admin"
        password: "$2b$05$1xYMVAvbi07ugIxKK9NcMu/oxDR.vjo30cBUkqtTNJdYkY0bMWQ1q",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "user one",
        email: "userOne@email.com",
        // password: "test123"
        password: "$2b$05$1XP5tQQxa7LRUCpMzw6xSuTE95RL5p0/Ooy07PFc1UPcxhxyVIhru",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "user two",
        email: "userTwo@email.com",
        // password: "test123"
        password: "$2b$05$05NnhBjDAWlKP0SA32PTh.m32fSj1pINfuoLUrGA5YAueKGpUgMcq",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
