'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicableDate: {
        type: Sequelize.DATE
      },
      stateName: {
        type: Sequelize.STRING
      },
      maxTemp: {
        type: Sequelize.STRING
      },
      minTemp: {
        type: Sequelize.STRING
      },
      windDirectionCompass: {
        type: Sequelize.STRING
      },
      windSpeed: {
        type: Sequelize.STRING
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Location',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Weather');
  }
};
