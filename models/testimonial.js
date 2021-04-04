'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.testimonial.belongsTo(models.profile, {
        as: 'sender',
        foreignKey: 'senderId'  
      })

      models.testimonial.belongsTo(models.profile, {
        as: 'recipient',
        foreignKey: 'recipientId'  
      })
    }
  };
  testimonial.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'testimonial',
  });
  return testimonial;
};