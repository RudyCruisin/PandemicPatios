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
      models.Restaurant.hasMany(models.Review)
      models.Review.belongsTo(models.Restaurant)

      models.User.hasMany(models.Review)
      models.Review.belongsTo(models.User)
    }
  };
  Review.init({
    maskRating: DataTypes.INTEGER,
    socialDistancingRating: DataTypes.INTEGER,
    sanitationRating: DataTypes.INTEGER,
    alcohol: DataTypes.BOOLEAN,
    foodRating: DataTypes.INTEGER,
    serviceRating: DataTypes.INTEGER,
    atmosphere: DataTypes.STRING, 
    patioSpaceRating: DataTypes.INTEGER,
    petFriendly: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};