// user.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasMany(models.Trip, { foreignKey: 'userId' });
      // Other associations
    }
  }

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING, // Hashed password, use bcrypt or other encryption
    isAdmin: DataTypes.BOOLEAN, // Flag to identify admin users
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
