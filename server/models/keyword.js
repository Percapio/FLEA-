'use strict';

module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Keyword.associate = models => {
    Keyword.hasMany( models.Website, {
      foreignKey: 'wordId',
      as: 'websites'
    });

    Keyword.belongsToMany( models.Hacker, {
      through: models.Website,
      foreignKey: 'wordId',
      as: 'hackers'
    });
  }
  return Keyword;
};