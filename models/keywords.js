'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class keywords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      keywords.hasOne(models.entity,{foreignKey:'id',sourceKey:'entity_id'});
    }
  };
  keywords.init({
    entity_id: DataTypes.INTEGER,
    keyword_name: DataTypes.STRING,
    keyword_variations: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'keywords',
  });
  return keywords;
};