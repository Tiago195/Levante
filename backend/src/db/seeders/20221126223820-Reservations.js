"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Reservations", [
      {
        userId: 2,
        bookId: 1,
        returnPreview: new Date("2022-11-15"),
        status: "Reading",
        createdAt: new Date("2022-10-06 22:52:18")
      },
      {
        userId: 2,
        bookId: 6,
        returnPreview: new Date("2022-11-30"),
        status: "Pending",
        createdAt: new Date("2022-11-26 22:52:18")
      },
      {
        userId: 2,
        bookId: 9,
        returnPreview: new Date("2022-12-31"),
        returnDate: new Date("2022-10-26 22:55:49"),
        status: "Finished",
        createdAt: new Date("2022-08-16 22:52:18")
      },
      {
        userId: 3,
        bookId: 2,
        returnPreview: new Date("2022-12-03"),
        status: "Reading",
        createdAt: new Date()
      },
      {
        userId: 3,
        bookId: 1,
        returnPreview: new Date("2022-09-17"),
        returnDate: new Date("2022-11-26 23:05:43"),
        status: "Finished",
        createdAt: new Date("2022-08-16 22:52:18")
      },
      {
        userId: 3,
        bookId: 8,
        returnPreview: new Date("2022-06-01"),
        returnDate: new Date("2022-08-26 23:05:43"),
        status: "Finished",
        createdAt: new Date("2022-05-16 22:52:18")
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reservations", null, {});
  }
};
