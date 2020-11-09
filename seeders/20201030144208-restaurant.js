'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Restaurants', [{
    name: 'The Optimist',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30318',
    phoneNumber: '404-477-6260',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '914',
    streetName: "Howell Mill Rd",
    lat: 33.7799858,
    lng: -84.41072059999999
  },{
    name: 'Pizza Cafe',
    city: 'Stone Mountain',
    state: 'GA',
    zipCode: '30087',
    phoneNumber: '770-413-6717',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '5370',
    streetName: "Stone Mountain Highway",
    lat: 33.8210146,
    lng: -84.117826
  },{
    name: 'Zunzi\'s',
    city: 'Savannah',
    state: 'GA',
    zipCode: '31401',
    phoneNumber: '912-443-9555',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '108',
    streetName: "East York Street",
    lat: 32.0774694,
    lng: -81.091224
  },{
    name: 'Flying Monk Noodle Bar',
    city: 'Savannah',
    state: 'GA',
    zipCode: '31401',
    phoneNumber: '912-232-8888',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '5',
    streetName: "West Broughton Street",
    lat: 32.07885150000001,
    lng: -81.0924098
  },{
    name: 'Kayak Kafé Midtown',
    city: 'Savannah',
    state: 'GA',
    zipCode: '31405',
    phoneNumber: '912-349-4371',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '5002',
    streetName: "Paulsen Street",
    lat: 32.0296311,
    lng: -81.0958421
  },{
    name: 'Treylor Park',
    city: 'Savannah',
    state: 'GA',
    zipCode: '31401',
    phoneNumber: '912-495-5557',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '115',
    streetName: "East Bay Street",
    lat: 32.0803063,
    lng: -81.0896291
  }
])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
