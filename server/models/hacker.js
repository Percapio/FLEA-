'use strict';

module.exports = (sequelize, DataTypes) => {
  const Hacker = sequelize.define('Hacker', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING
    },
  });

  Hacker.associate = models => {
    Hacker.hasMany( models.Website, {
      foreignKey: 'hackerId',
      as: 'websites'
    });

    Hacker.belongsToMany( models.Keyword, {
      through: models.Website,
      foreignKey: 'wordId',
      as: 'keywords'
    });
  }

  return Hacker;
};