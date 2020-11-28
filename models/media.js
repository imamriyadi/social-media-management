'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      media.belongsTo(models.users,{foreignKey:'id'});
    }
  };
  media.init({
    name: DataTypes.STRING(150),
    description: DataTypes.STRING,
    icon:DataTypes.STRING(150),
    is_active: DataTypes.INTEGER(1)
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};
