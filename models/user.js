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
<<<<<<< HEAD
      user.hasOne(models.mentor, {foreignKey: 'mentorEmail', sourceKey: 'email'})
      user.hasOne(models.mentee, {foreignKey: 'menteeEmail', sourceKey: 'email'})
=======
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
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
<<<<<<< HEAD
      defaultValue: false
=======
      defaultValue: true
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};