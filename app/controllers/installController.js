require("dotenv").config();
const client = require("../database");
const { Card, List, Label, Project, User } = require("../models");
const { CardLabel, ProjectCollaborator } = require("../models")

async function init() {
  await User.sync({ force: true });
  await Project.sync({ force: true });
  await List.sync({ force: true });
  await Card.sync({ force: true });
  await Label.sync({ force: true });

  // Créez la table de liaison "project_has_collaborators"
  await ProjectCollaborator.sync({ force: true });

  // Créez la table de liaison "card_has_label"
  await CardLabel.sync({ force: true });

  console.log("All models were create successfully.");
}

init();