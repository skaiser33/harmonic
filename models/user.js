'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongsTo(models.city)
      models.user.hasMany(models.testimonial)
      models.user.hasMany(models.message)
      models.user.belongsToMany(models.instrument, {through: "usersInstruments"})
      models.user.belongsToMany(models.genre, {through: "usersGenres"})
      models.user.belongsToMany(models.collaboration, {through: "usersCollaborations"})
      models.user.belongsToMany(models.user,{ through: "favorites", as: "favoriter", foreignKey: "favoriterId" });
      models.user.belongsToMany(models.user,{ through: "favorites", as: "favorited", foreignKey: "favoritedId" });
      models.user.belongsToMany(models.user,{ through: "unfavorites", as: "unfavoriter", foreignKey: "unfavoriterId" });
      models.user.belongsToMany(models.user,{ through: "unfavorites", as: "unfavorited", foreignKey: "unfavoritedId" });
      
    }
    // Compares entered password to hashed password and returns boolean
    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password);  //"this" refers to the user's pw
    };
    // remove the password before serializing
    toJSON() {
      let userData = this.get();
      delete userData.password;
      return userData;
    };
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    cityId: DataTypes.INTEGER,
    isBand: DataTypes.BOOLEAN,
    profilePhotoUrl: DataTypes.STRING,
    influences: DataTypes.ARRAY(DataTypes.TEXT),
    recordingCredits: DataTypes.ARRAY(DataTypes.TEXT),
    spotifyEmbedUrl: DataTypes.STRING,
    soundcloudEmbedUrl: DataTypes.STRING,
    youtubeEmbedUrl: DataTypes.STRING,
    localDraw: DataTypes.INTEGER,
    nationalDraw: DataTypes.INTEGER,
    lastActive: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'user',
});

  //HOOKS - moments in time where we can trigger specific functionality
user.beforeCreate((pendingUser, options) => {
    if (pendingUser && pendingUser.password) {
      // hash the password
      let hash = bcrypt.hashSync(pendingUser.password, 12);
      // store the hash as the user's password in the db
      pendingUser.password = hash;
    }
  })
  return user;
};