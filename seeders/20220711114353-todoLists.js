"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoLists",
      [
        {
          name: "Girls I wanna date",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          name: "Things I wanna do now I've left my friends",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          name: "Eleminate all the back-players",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          name: "Boys I wanna kiss",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
