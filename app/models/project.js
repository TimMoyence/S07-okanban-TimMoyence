const { DataTypes, Model } = require('sequelize');
const client = require('../database');

// on fait hériter notre nouvelle classe de Model
class Project extends Model {};

// on définit notre classe
Project.init(
  {
    title: DataTypes.TEXT,
  },
  {
    sequelize: client,
    tableName: "project",
  }
);


module.exports = Project;