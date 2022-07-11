"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Make sliding on Mirrie",
          deadline: "This saturday during the warming-up",
          createdAt: new Date(),
          updatedAt: new Date(),
          important: false,
          // listId: 3,
        },
        {
          task: "Being mean to Rachel",
          deadline: "This week on Whatsapp",
          createdAt: new Date(),
          updatedAt: new Date(),
          important: true,
          // listId: 3,
        },
        {
          task: "Kicking Danike",
          deadline: "As soon as possible",
          createdAt: new Date(),
          updatedAt: new Date(),
          important: true,
          // listId: 3,
        },
        {
          task: "Standing on Corries toe",
          deadline: "I already did",
          createdAt: new Date(),
          updatedAt: new Date(),
          important: false,
          // listId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
