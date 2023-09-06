const { DataTypes, Model } = require('sequelize');
const client = require('../database');

// on fait hériter notre nouvelle classe de Model
class Card extends Model {};

// on définit notre classe
Card.init({
    description: DataTypes.TEXT,
    position: DataTypes.SMALLINT,
    color: DataTypes.STRING,
    listId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'list',
          key: 'id'
        }
      },
}, {
    sequelize: client,
    tableName: 'card'
});


module.exports = Card;