'use strict';

module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Website.associate = models => {
    Website.belongsTo( models.Hacker, {
      foreignKey: 'hackerId',
      onDelete: 'CASCADE'
    });

    Website.belongsTo( models.Keyword, {
      foreignKey: 'wordId',
    });
  }
  return Website;
};