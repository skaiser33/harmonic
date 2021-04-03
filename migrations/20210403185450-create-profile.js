'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      isBand: {
        type: Sequelize.BOOLEAN
      },
      profilePhotoUrl: {
        type: Sequelize.STRING
      },
      availableFor: {
        type: Sequelize.STRING
      },
      influences: {
        type: Sequelize.ARRAY
      },
      recordingCredits: {
        type: Sequelize.ARRAY
      },
      canRecordRemotely: {
        type: Sequelize.BOOLEAN
      },
      spotifyEmbedUrl: {
        type: Sequelize.STRING
      },
      soundcloudEmbedUrl: {
        type: Sequelize.STRING
      },
      youtubeEmbedUrl: {
        type: Sequelize.STRING
      },
      localDraw: {
        type: Sequelize.INTEGER
      },
      nationalDraw: {
        type: Sequelize.INTEGER
      },
      lastActive: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};