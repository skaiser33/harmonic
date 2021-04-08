'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isBand: {
        type: Sequelize.BOOLEAN
      },
      profilePhotoUrl: {
        type: Sequelize.STRING
      },
      influences: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      recordingCredits: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
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
    await queryInterface.dropTable('users');
  }
};