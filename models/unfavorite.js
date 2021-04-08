'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unfavorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  unfavorites.init({
    unfavoriterId: DataTypes.INTEGER,
    unfavoritedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unfavorites',
  });
  return unfavorites;
};