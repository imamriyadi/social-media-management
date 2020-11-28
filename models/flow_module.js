'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flow_module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      flow_module.hasOne(models.users,{foreignKey:'id',sourceKey:'user_id'});
      flow_module.hasOne(models.flow,{foreignKey:'id',sourceKey:'flow_id'});
      flow_module.hasOne(models.project,{foreignKey:'id',sourceKey:'project_id'})
    }
  };
  flow_module.init({
    user_id: DataTypes.INTEGER,
    flow_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    key_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'flow_module',
  });
  return flow_module;
};
