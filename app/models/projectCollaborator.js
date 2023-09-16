// models/ProjectCollaborator.js

const { DataTypes, Model } = require("sequelize");
const client = require("../database");

class ProjectCollaborator extends Model {}

ProjectCollaborator.init({
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: client,
  modelName: "project_has_collaborators", // Nom du modèle (table)
});

module.exports = ProjectCollaborator;
