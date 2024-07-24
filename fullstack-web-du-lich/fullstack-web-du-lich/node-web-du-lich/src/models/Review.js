// review.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Location, { foreignKey: 'locationId' }); // Update 'location_id' to 'locationId'
      Review.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Review.init(
    {
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      locationId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  return Review;
};
