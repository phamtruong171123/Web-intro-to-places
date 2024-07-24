'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Weather, { foreignKey: 'locationId' });
      Location.hasMany(models.Trip, { foreignKey: 'locationId' });
      Location.hasMany(models.Review, { foreignKey: 'locationId' }); // Add this line
    }
  }

  Location.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    map: DataTypes.STRING, // URL to map or coordinates
    image1: DataTypes.TEXT, // Base64 representation of image 1
    image2: DataTypes.TEXT, // Base64 representation of image 2
    image3: DataTypes.TEXT, // Base64 representation of image 3
    // Other location-related fields
  }, {
    sequelize,
    modelName: 'Location',
  });

  return Location;
};
