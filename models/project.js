'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  project.init({
    name: DataTypes.STRING,
    media_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    slug:DataTypes.STRING,
    token:DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
  });

  project.associate = (models) =>{
    project.hasOne(models.users,{foreignKey:'id',sourceKey:'user_id'});
    project.hasOne(models.media,{foreignKey:'id',sourceKey:'media_id'});
  }
  return project;
};
