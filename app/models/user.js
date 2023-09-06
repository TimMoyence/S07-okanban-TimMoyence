

const { DataTypes, Model } = require('sequelize');
const client = require('../database');

// on fait hériter notre nouvelle classe de Model
class User extends Model {};

// on définit notre classe
User.init(
  {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    projetId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projet",
        key: "id",
      },
    },
  },
  {
    sequelize: client,
    tableName: "user",
  }
);


module.exports = User;