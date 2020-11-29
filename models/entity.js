'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      entity.hasOne(models.users,{foreignKey:'id',sourceKey:'user_id'});
    }
  };
  entity.init({
    user_id: DataTypes.INTEGER,
    entity_name: DataTypes.STRING(150),
    entity_value: DataTypes.STRING(150),
    entity_score: DataTypes.STRING(50),
    entity_type: DataTypes.STRING(150),
    entity_keywords: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'entity',
  });

  return entity;
};
