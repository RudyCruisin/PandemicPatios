'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Restaurants', [{
    name: 'TestSite',
    address: 'TestAddress',
    city: 'TestCity',
    state: 'TestCity',
    zipCode: '000001',
    phoneNumber: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date()
  }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {
      name: 'TestSite'
    });
  }
};
