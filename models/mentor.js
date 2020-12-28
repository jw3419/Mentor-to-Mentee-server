'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mentor.init({
    mentorEmail: DataTypes.STRING,
    company: DataTypes.STRING,
    department: DataTypes.STRING,
    job: DataTypes.STRING,
    position: DataTypes.STRING,
    career: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mentor',
  });
  return mentor;
};