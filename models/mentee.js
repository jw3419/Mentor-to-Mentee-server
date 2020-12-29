'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mentee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      mentee.belongsTo(models.user, {foreignKey: 'menteeEmail', targetKey: 'email'});
      mentee.hasMany(models.qa, {foreignKey: 'menteeId', sourceKey: 'id'});
=======
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
    }
  };
  mentee.init({
    menteeEmail: DataTypes.STRING,
    uni: DataTypes.STRING,
    major: DataTypes.STRING,
    graduation: DataTypes.BOOLEAN,
    grade: DataTypes.STRING,
    menteeDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mentee',
  });
  return mentee;
};