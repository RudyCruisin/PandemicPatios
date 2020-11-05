'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.oAuths.hasMany(models.User)
      models.User.belongsTo(models.oAuths)
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    GH_ID: DataTypes.STRING,
    FB_ID: DataTypes.STRING,
    TWIT_ID: DataTypes.STRING,
    GOOG_ID: DataTypes.STRING,
    // auth_ID: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};