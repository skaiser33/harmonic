'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profilesCollaborations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.collaboration.belongsToMany(models.profile, {through: "profilesCollaborations"})
    }
  };
  profilesCollaborations.init({
    profileId: DataTypes.INTEGER,
    collaborationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profilesCollaborations',
  });
  return profilesCollaborations;
};