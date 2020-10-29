'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Reviews', [{
    restaurantID: "1",
    userID: "1",
    maskRating: "4",
    socialDistancingRating: "5",
    sanitationRating: "3",
    alcohol: "YES",
    foodRating: "4",
    serviceRating: "4",
    atmosphere: "Quiet",
    patioSpaceRating: "2",
    musicRating: "3",
    petFriendly: "NO",
    createdAt: new Date(),
    updatedAt: new Date(),
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
