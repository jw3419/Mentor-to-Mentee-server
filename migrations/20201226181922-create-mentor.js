'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mentors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentorEmail: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      job: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      career: {
        type: Sequelize.STRING
      },
      description: {
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
    await queryInterface.dropTable('mentors');
  }
};