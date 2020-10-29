'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Review.init({
    restaurantID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    maskRating: DataTypes.INTEGER,
    socialDistancingRating: DataTypes.INTEGER,
    sanitationRating: DataTypes.INTEGER,
    alcohol: DataTypes.STRING,
    foodRating: DataTypes.INTEGER,
    serviceRating: DataTypes.INTEGER,
    atmosphere: DataTypes.STRING,
    patioSpaceRating: DataTypes.INTEGER,
    musicRating: DataTypes.INTEGER,
    petFriendly: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};