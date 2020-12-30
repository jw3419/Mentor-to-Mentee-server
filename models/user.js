'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.mentor, {foreignKey: 'mentorEmail', sourceKey: 'email'})
      user.hasOne(models.mentee, {foreignKey: 'menteeEmail', sourceKey: 'email'})
    }
  };
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mobile: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    isMentor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};