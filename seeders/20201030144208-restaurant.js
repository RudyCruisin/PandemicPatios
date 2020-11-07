'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Restaurants', [{
    name: 'The Optimist',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30318',
    phoneNumber: '4044776260',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '914',
    streetName: "Howell Mill Rd",
    lat: 33.7799858,
    lng: -84.41072059999999
  }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
