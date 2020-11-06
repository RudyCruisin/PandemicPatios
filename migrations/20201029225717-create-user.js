'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      GH_ID: {
        allowNull: true,
        type: Sequelize.STRING
      },
      FB_ID: {
        allowNull: true,
        type: Sequelize.STRING
      },
      TWIT_ID: {
        allowNull: true,
        type: Sequelize.STRING
      },
      GOOG_ID: {
        allowNull: true,
        type: Sequelize.STRING
      }
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};