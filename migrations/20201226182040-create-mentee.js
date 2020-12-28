'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mentees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menteeEmail: {
        type: Sequelize.STRING
      },
      uni: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      graduation: {
        type: Sequelize.BOOLEAN
      },
      grade: {
        type: Sequelize.STRING
      },
      menteeDescription: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mentees');
  }
};