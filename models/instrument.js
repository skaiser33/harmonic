'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.instrument.belongsToMany(models.profile, {through: "profilesInstruments"})
    }
  };
  instrument.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'instrument',
  });
  return instrument;
};