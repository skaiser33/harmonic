'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersCollaborations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.collaboration.belongsToMany(models.user, {through: "usersCollaborations"})
    }
  };
  usersCollaborations.init({
    userId: DataTypes.INTEGER,
    collaborationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersCollaborations',
  });
  return usersCollaborations;
};