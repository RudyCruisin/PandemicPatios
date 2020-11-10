'use strict';

const { DataTypes } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Restaurants',
      'phoneNumber',
      {
        type: DataTypes.STRING
      }
    )
    await queryInterface.changeColumn(
      'Reviews',
      'alcohol',
      {
        type: DataTypes.STRING
      }
    )
    await queryInterface.changeColumn(
      'Reviews',
      'petFriendly',
      {
        type: DataTypes.STRING
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
