// models/CardLabel.js

const { DataTypes, Model } = require("sequelize");
const client = require("../database");

class CardLabel extends Model {}

CardLabel.init({
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  label_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: client,
  modelName: "card_has_label", // Nom du modèle (table)
});

module.exports = CardLabel;
