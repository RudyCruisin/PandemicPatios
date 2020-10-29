'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Reviews', [{
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
     },{
    maskRating: "5",
    socialDistancingRating: "5",
    sanitationRating: "5",
    alcohol: "YES",
    foodRating: "5",
    serviceRating: "5",
    atmosphere: "Loud",
    patioSpaceRating: "5",
    musicRating: "5",
    petFriendly: "YES",
    createdAt: new Date(),
    updatedAt: new Date(),
    },{
    maskRating: "1",
    socialDistancingRating: "1",
    sanitationRating: "1",
    alcohol: "NO",
    foodRating: "1",
    serviceRating: "1",
    atmosphere: "Dull",
    patioSpaceRating: "1",
    musicRating: "1",
    petFriendly: "NO",
    createdAt: new Date(),
    updatedAt: new Date(),
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
