// payment.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Trip, { foreignKey: 'tripId' });
      Payment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Payment.init({
    amount: DataTypes.DECIMAL(10, 2),
    paymentDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Payment',
  });

  return Payment;
};
