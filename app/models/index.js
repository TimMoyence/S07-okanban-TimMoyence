// on centralise les modèles
const Card = require('./card');
const Label = require('./label');
const List = require('./list');
const User = require('./user');
const Projet = require('./projet');


// on spécifie les associations

// un user detient plusieurs Projets 
User.hasMany(Projet, {
    as: "projet",
    foreignKey: "user_id",
});

// une Projet detient un user
Projet.belongsTo(User, {
  as: 'userName',
});


// Une Projet contient plusieurs liste
Projet.hasMany(List,{
    as: 'listName',
    foreignKey: "list_id",
})
// Une liste contient une seul Projet
List.belongsTo(Projet, {
  as: "projetName",
});

// Une liste a plusieurs cartes
List.hasMany(Card, {
    as: 'cards',
});
// Une carte appartient à une liste
Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

// Un label peut avoir plusieurs cartes
Label.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_label',
    foreignKey: 'label_id',
    otherKey: 'card_id',
    timestamps: false // permet d'éviter que sequelize rajoute updated_at et created_at dans l'insertion en BDD (vu que on a un timestamp par défaut côté postgresql, pas besoin de s'en occuper ici)
})

// Une carte peut avoir plusieurs labels
Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id',
    timestamps: false
})




// on exporte les modèles modifiés
module.exports = { Card, List, Label, Table, User }