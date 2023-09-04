const { Label, Card } = require('../models');


labelController = {

    async getLabels(req, res) {
        try {
            const labels = await Label.findAll();
            if(!labels) {
                res.status(404).send('labels not found')
            } else {
                res.send(labels)
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    async getOneLabel(req, res) {
        try {
            const { id } = req.params;
            const label = await Label.findByPk(id);
            if(!label) {
                res.status(404).send('label not found')
            } else {
                res.json(label);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    async createLabel(req,res) {
        try {
            // on récupère les données du formulaire. Selon la BDD, une liste doit posséder un nom et une position (cette dernière est optionnelle, avec une position par défaut)
            const { name, color } = req.body;
            // on crée la liste en lui appliquant les données récupérées via le formulaire
            const formErrors = [];
            if(!name) {
                formErrors.push('name not found')
            }
            if(!color) {
                formErrors.push('color not found')
            }
            if(formErrors.length > 0) {
                res.status(400).json(formErrors)
            } else {
                const newLabel = await Label.create({
                    name,
                    color
                });
                if(!newLabel) {
                    res.status(400).send('issue with creating new label')
                } else {
                    res.send(newLabel)
                }
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    
    async updateLabel(req, res) {
        try {
            const { id } = req.params;
            const { name, color } = req.body;
            const label = await Label.findByPk(id);
            if(!label) {
                res.status(404).send('label does not exist')
            } else {
                if(name) {
                    label.name = name;
                }
                if(color) {
                    label.color = color;
                }
                await label.save()
                res.json(label);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    
    async deleteLabel(req, res) {
        try {
            // on récupère le paramètre passé à la route
            const { id } = req.params;
            // on récupère la liste ayant l'id mentionné
            const label = await Label.findByPk(id);
            // on vérifie que le label existe
            if(!label) {
                res.status(404).send('label not found')
            } else {
                // on supprime le label
                const result = await label.destroy();
            // on renvoie la valeur de retour à notre client
            res.json('ok')
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },

    async associateLabelToCard(req, res) {
        try {

            // on récupère l'id de la carte
            const cardId = req.params.id;
            // on récupère l'id du tag
            const labelId = req.body.labelId;

            // on cherche la carte demandée
            // on vérifie que la carte existe
            const card = await Card.findByPk(cardId);
            if (!card) {
                return res.status(404).json('card not found');
            }
            // on cherche le tag demandé
            // on vérifie qu'il existe
            const label = await Label.findByPk(labelId);
            if (!label) {
                return res.status(404).json('label not found');
            }

            // il existe des méthodes pré établies permettant de lier un modèle à un autre à partir  du moment où le lien a déjà été établi 
            await card.addLabel(label)
            // pour renvoyer un modèle avec l'association, on a besoin de demander à sequelize la carte concernée car elle ne sera pas mis à jour sur express directement
            const updatedCard = await Card.findByPk(cardId, {
                include: ['labels']
            })
            res.json(updatedCard);

        }catch(e) {
            console.trace(error);
            res.status(500).json(error);
        }

    },


    async removeLabelFromCard(req, res) {
        try {

            // on récupère l'id de la carte et du label
            const { labelId, cardId } = req.params;
            // on vérifie l'existence des 2 éléments
            const label = await Label.findByPk(labelId);
            if (!label) {
                return res.status(404).json('Label not found')
            }
            let card = await Card.findByPk(cardId);
            if (!card) {
                return res.status(404).json('Card not found');
            }
            // on supprime le lien entre le label et la carte 
            card.removeLabel(label);
        
            // on récupère l'instance mise à jour
            card = await Card.findByPk(cardId, {
                include: ['labels']
            });

            // on envoie une réponse au client
            res.json(card)
        } catch(e) {
            console.trace(e);
            res.status(500).json(e);
        }
    } 

};
module.exports = labelController;