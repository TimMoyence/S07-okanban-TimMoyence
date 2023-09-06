

const { DataTypes, Model } = require('sequelize');
const client = require('../database');

// on fait hériter notre nouvelle classe de Model
class Projet extends Model {};

// on définit notre classe
Projet.init(
  {
    title: DataTypes.TEXT,
    listId: {
      type: DataTypes.INTEGER,
      references: {
        model: "list",
        key: "id",
      },
    },
  },
  {
    sequelize: client,
    tableName: "projet",
  }
);


module.exports = Projet;