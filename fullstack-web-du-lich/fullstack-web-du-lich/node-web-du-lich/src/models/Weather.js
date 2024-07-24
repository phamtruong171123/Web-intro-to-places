// weather.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    static associate(models) {
      Weather.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  }

  Weather.init({
    applicableDate: DataTypes.DATE,
    stateName: DataTypes.STRING,
    maxTemperature: DataTypes.STRING,
    minTemperature: DataTypes.STRING,
    windDirectionCompass: DataTypes.STRING,
    windSpeed: DataTypes.STRING,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Weather',
  });

  return Weather;
};
