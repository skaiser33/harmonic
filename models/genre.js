'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.genre.belongsToMany(models.profile, {through: "profilesGenres"})
    }
  };
  genre.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'genre',
  });
  return genre;
};