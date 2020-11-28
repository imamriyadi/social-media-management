'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class intent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      intent.hasOne(models.users,{foreignKey:'id',sourceKey:'user_id'});
      intent.hasOne(models.entity,{foreignKey:'id',sourceKey:'entity_id'});
      intent.hasOne(models.flow,{foreignKey:'id',sourceKey:'flow_id'});
    }
  };
  intent.init({
    user_id: DataTypes.INTEGER,
    intent_name: DataTypes.STRING,
    intent_type: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    flow_id: DataTypes.INTEGER,
    keyword_name: DataTypes.STRING,
    keyword_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'intent',
  });
  return intent;
};
