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
<<<<<<< HEAD
      mentor.belongsTo(models.user, {foreignKey: 'mentorEmail', targetKey: 'email'});
      mentor.hasMany(models.qa, {foreignKey: 'mentorId', sourceKey: 'id'});
=======
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
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