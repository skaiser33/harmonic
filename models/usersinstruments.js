'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersInstruments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usersInstruments.init({
    userId: DataTypes.INTEGER,
    instrumentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersInstruments',
  });
  return usersInstruments;
};