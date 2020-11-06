'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('oAuths',[{
      authStrat: "Twitter",     
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      authStrat: "FaceBook",     
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      authStrat: "Google",     
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      authStrat: "Github",     
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
