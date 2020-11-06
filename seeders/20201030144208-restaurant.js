'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Restaurants', [{
    name: 'TestSite',
    city: 'TestCity',
    state: 'TestState',
    zipCode: '000001',
    phoneNumber: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '000000',
    streetName: "testName"
  }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {
      name: 'TestSite'
    });
  }
};
