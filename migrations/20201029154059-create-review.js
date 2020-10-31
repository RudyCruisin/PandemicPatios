'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maskRating: {
        type: Sequelize.INTEGER
      },
      socialDistancingRating: {
        type: Sequelize.INTEGER
      },
      sanitationRating: {
        type: Sequelize.INTEGER
      },
      alcohol: {
        type: Sequelize.STRING
      },
      foodRating: {
        type: Sequelize.INTEGER
      },
      serviceRating: {
        type: Sequelize.INTEGER
      },
      atmosphere: {
        type: Sequelize.STRING
      },
      patioSpaceRating: {
        type: Sequelize.INTEGER
      },
      petFriendly: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};