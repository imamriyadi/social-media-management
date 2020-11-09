'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.Task, { foreignKey: 'user_id', targetKey: 'id' }) 
    }
  };
  users.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        unique: {
          args: true,
          msg: 'Email already registered'
        }, 
        isEmail: {
          args: true,
          msg: 'checks for email format'
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        args: true,
        msg: 'Username already registered'
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: 'Password length must be at least 3 characters'
        }
    },
    last_name:  {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your last name'
        }
      }
    },
    frist_name:  {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your frist name'
        }
      }
    }
  }, {
    hooks:{
        beforeCreate:(users,options) =>{
          encrypt(users.password);
        }
    },
    sequelize,
    modelName: 'users',
  });
  return users;
};