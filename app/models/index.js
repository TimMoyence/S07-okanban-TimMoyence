// on centralise les modèles
const Card = require('./card');
const Label = require('./label');
const List = require('./list');
const User = require('./user');
const Project = require('./project');

// on spécifie les associations


// Une Project contient plusieurs liste
Project.hasMany(List,{
    as: 'listName',
});
// Une liste contient une seul Project
List.belongsTo(Project, {
  as: "ProjectName",
  foreignKey: "project_id",
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
});

// Une carte peut avoir plusieurs labels
Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id',
    timestamps: false
});

// Un project aura plusieurs user
Project.belongsToMany(User, {
  as: "collaborators",
  through: "project_has_collaborators",
  foreignKey: "project_id",
  otherKey: "user_id",
});

// Un user aura plusieurs Projectt
User.belongsToMany(Project, {
  as: "project",
  through: "project_has_collaborators",
  foreignKey: "user_id",
  otherKey: "project_id",
});


// on exporte les modèles modifiés
module.exports = { Card, List, Label, Project, User };