

const { DataTypes, Model } = require('sequelize');
const client = require('../database');

// on fait hériter notre nouvelle classe de Model
class Table extends Model {};

// on définit notre classe
Table.init(
  {
    name: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize: client,
    tableName: "table",
  }
);


module.exports = Table;