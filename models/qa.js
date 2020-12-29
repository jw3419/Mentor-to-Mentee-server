'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      qa.belongsTo(models.mentor, {foreignKey: 'mentorId', targetKey: 'id'});
      qa.belongsTo(models.mentee, {foreignKey: 'menteeId', targetKey: 'id'})
=======
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
    }
  };
  qa.init({
    brief: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    mentorId: DataTypes.INTEGER,
    menteeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'qa',
  });
  return qa;
};