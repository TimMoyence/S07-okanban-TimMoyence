require("dotenv").config();
const client = require("../database");
const { Card, List, Label, Project, User } = require("../models");

async function init() {
  await User.sync({ force: true });
  await Project.sync({ force: true });
  await List.sync({ force: true });
  await Card.sync({ force: true });
  await Label.sync({ force: true });

  console.log("All models were create successfully.");
}

init();