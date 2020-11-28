'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class state extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  state.init({
    state_name: DataTypes.STRING(150),
    state_action_type: DataTypes.STRING(150),
    state_conditions: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'state',
  });
  return state;
};
