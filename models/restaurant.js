'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Restaurant.init({
    name: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    streetName: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};