'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.message.belongsTo(models.user, {
        as: 'sender',
        foreignKey: 'senderId'  
      })

      models.message.belongsTo(models.user, {
        as: 'recipient',
        foreignKey: 'recipientId'  
      })
    }
  };
  message.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};