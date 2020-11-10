'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Restaurants',
      'city',
      {
        type: Sequelize.STRING
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'state',
      {
        type: Sequelize.STRING
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'zipCode',
      {
        type: Sequelize.INTEGER
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'phoneNumber',
      {
        type: Sequelize.INTEGER
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'streetNumber',
      {
        type: Sequelize.INTEGER
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'streetName',
      {
        type: Sequelize.STRING
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'lat',
      {
        type: Sequelize.FLOAT
      }
    )
    await queryInterface.addColumn(
      'Restaurants',
      'long',
      {
        type: Sequelize.FLOAT
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
