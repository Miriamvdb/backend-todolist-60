"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Bibi Krom",
          email: "bibi@krom.com",
          phone: "0612345678",
          password: "imthetopscorerofEDO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Joyce Ridder",
          email: "joyce@ridder.com",
          phone: "0623456781",
          password: "immissingmysoccerteamalreadycryingalldaylong",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Iris Knuvers",
          email: "iris@knuvers.com",
          phone: "0634567812",
          password: "mirriethinksshesthebestbackplayerhahashesnot",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Merel Bekker",
          email: "merel@bekker.com",
          phone: "0645678123",
          password: "imthebestdefender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
