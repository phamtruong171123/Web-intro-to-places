// trip.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsTo(models.Location, { foreignKey: 'locationId' });
      Trip.belongsTo(models.User, { foreignKey: 'userId' });
      Trip.hasOne(models.Payment, { foreignKey: 'tripId' });
      // Add more associations as needed
    }
  }

  Trip.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER, // Số lượng người tham gia chuyến đi
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Trip',
  });

  return Trip;
};
