'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('users', 'id');
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      primaryKey: true
    });
    await queryInterface.changeColumn('mentors', 'mentorEmail', {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'email'
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('mentees', 'menteeEmail', {
      type: Sequelize.STRING,
      references: {
        model: 'users',
        key: 'email'
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('qas', 'mentorId', {
      type: Sequelize.STRING,
      references: {
        model: 'mentors',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('qas', 'menteeId', {
      type: Sequelize.STRING,
      references: {
        model: 'mentees',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('users', 'id', {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('mentors', 'mentorEmail', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('mentees', 'menteeEmail', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('qas', 'mentorId', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('qas', 'menteeId', {
      type: Sequelize.STRING,
    });
  }
};
