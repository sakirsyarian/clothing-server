'use strict';

const { hashPassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role)
      User.hasMany(models.Product)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email can't be null"
        },
        notEmpty: {
          msg: "Email can't be empty"
        },
        isEmail: {
          msg: "You must enter a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password can't be null"
        },
        notEmpty: {
          msg: "Password can't be empty"
        },
        len: {
          args: [5, 20],
          msg: 'Password must be between 5 and 20 characters'
        },
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role can't be null"
        },
        notEmpty: {
          msg: "Role can't be empty"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, options) => {
    user.password = hashPassword(user.password);
  });

  return User;
};