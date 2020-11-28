'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      flow.hasOne(models.users,{foreignKey:'id',sourceKey:'user_id'});
      flow.hasOne(models.project,{foreignKey:'id',sourceKey:'project_id'})
    }
  };
  flow.init({
    user_id: DataTypes.INTEGER,
    flow_name: DataTypes.STRING,
    project_id:DataTypes.INTEGER,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'flow',
  });
  return flow;
};
