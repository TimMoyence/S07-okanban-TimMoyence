const { Project } = require("../models");

const projectController = {
  async createProject(req, res) {
    try {
      const { id, title } = req.body;
      if (!title) {
        title = "okanban";
      }
      if (!id) {
        const CreateProjectWithoutId = await Project.create({
          title: title,
        });
        return res.json(CreateProjectWithoutId);
      }
      const CreateProject = await Project.create({
        title: title,
        id: id,
      });

      res.json(CreateProject);
    } catch (e) {
      console.trace(e);
      res.status(500).json(e.toString());
    }
  },

  async getProjectName(req, res) {
    try {
      const id = req.params.id;
      const project = await Project.findByPk(id);
      // on peut envoyer une réponse avec res.send (généraliste) mais on peut aussi préparer une réponse avec res.json
      if (!project) {
        res.status(404).json("any project found");
      } else {
        res.json(project);
      }
    } catch (e) {
      console.trace(e);
      // pour avoir des réponses uniformes auprès du client, on transforme l'erreur en json à envoyer au client
      res.status(500).json(e.toString());
    }
  },

  async uptadeProjectName(req, res) {},
};

module.exports = projectController;
