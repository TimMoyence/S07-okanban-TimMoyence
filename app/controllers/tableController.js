const { Table } = require("../models");


const tableController = {
  async getTableOfUser(req, res) {
    try {
      const id = req.params.id
      const table = await Table.findByPk(id);
      // on peut envoyer une réponse avec res.send (généraliste) mais on peut aussi préparer une réponse avec res.json
      if (!table) {
        res.status(404).send("any table found");
      } else {
        res.json(table);
      }
    } catch (e) {
      console.trace(e);
      // pour avoir des réponses uniformes auprès du client, on transforme l'erreur en json à envoyer au client
      res.status(500).json(e.toString());
    }
  },
};

module.exports = tableController;