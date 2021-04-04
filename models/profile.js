'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.profile.belongsTo(models.user)
      models.profile.belongsTo(models.city)
      models.profile.hasMany(models.testimonial)
      models.profile.hasMany(models.message)
      models.profile.belongsToMany(models.instrument, {through: "profilesInstruments"})
      models.profile.belongsToMany(models.genre, {through: "profilesGenres"})
      models.profile.belongsToMany(models.collaboration, {through: "profilesCollaborations"})
    }
  };
  profile.init({
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isBand: DataTypes.BOOLEAN,
    profilePhotoUrl: DataTypes.STRING,
    influences: DataTypes.ARRAY(DataTypes.TEXT),
    recordingCredits: DataTypes.ARRAY(DataTypes.TEXT),
    canRecordRemotely: DataTypes.BOOLEAN,
    spotifyEmbedUrl: DataTypes.STRING,
    soundcloudEmbedUrl: DataTypes.STRING,
    youtubeEmbedUrl: DataTypes.STRING,
    localDraw: DataTypes.INTEGER,
    nationalDraw: DataTypes.INTEGER,
    lastActive: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};