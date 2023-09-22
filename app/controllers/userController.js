const { User, Project, ProjectCollaborator } = require("../models")
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');
const secretKey = 'votre-clé-secrète'; // Clé secrète pour signer le jeton

const userController = {

    async registerAction(req,res) {
        try {
          const { firstname, lastname, email, password, passwordConfirm } =
            req.body;

          if (password != passwordConfirm) {
            return res
              .status(404)
              .json(
                "Les mots de passe ne sont pas identiques, veuillez réessayer. Vous êtes proche de créer le coffre-fort secret, mais il semble que les clés ne correspondent pas tout à fait !"
              );
          };
          if(!emailValidator.validate(email)){
            return res
              .status(404)
              .json(
                "Votre email est invalide, mais ne vous en faites pas, nous n'essayons pas de communiquer avec des extraterrestres par courrier électronique !"
              );
          };

          const userExist = await User.findOne({
            where : {email : email}
          });

          if(userExist){
           return res
             .status(404)
             .json("Problème de connexion, veuillez réessayer. Nous promettons que nos serveurs ne pratiquent pas la magie noire, ils sont juste d'humeur capricieuse parfois !");
          };

          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt)

          // Créez un utilisateur
          const user = await User.create({
            firstname,
            lastname,
            email,
            password: hash,
          });

          // Créez un projet
          const project = await Project.create({
            title: "Okanban",
          });

          // Associez l'utilisateur au projet en créant une entrée dans la table de liaison
          await ProjectCollaborator.create({
            project_id: project.id,  // L'ID du projet créé précédemment
            user_id: user.id,        // L'ID de l'utilisateur créé précédemment
          });


          res.json(
            "L'utilisateur a bien été créé ! C'est comme si nous avions ajouté une nouvelle étoile à notre galaxie d'utilisateurs brillants."
          );

        } catch (e) {
          console.trace(e);
          res.status(500).json(e.toString());
        }
    },

    async loginAction(req,res){
        try {
          const { email, password } = req.body;

          if (!emailValidator.validate(email)) {
            return res
              .status(404)
              .json(
                "Votre email est invalide, mais ne vous inquiétez pas, nous ne demandons pas une dissertation en latin pour valider votre compte !"
              );
          }

          const userExist = await User.findOne({
            where: { email: email },
          });

          if (!userExist) {
            return res
              .status(404)
              .json("Problème de connexion, veuillez réessayer. Nous promettons que nos serveurs ne pratiquent pas la magie noire, ils sont juste d'humeur capricieuse parfois !");
          }

          let ok = false;
          if (userExist) {
            ok = await bcrypt.compare(password, userExist.password);
          }

          if (ok) {
            delete userExist.dataValues.password;
            req.session.user = userExist.dataValues;
            // Après que l'utilisateur se soit connecté avec succès
            // console.log(req.session.user)
            const user = req.session.user; // L'utilisateur authentifié

            // Génération du jeton JWT
            const token = jwt.sign({ user }, secretKey, { expiresIn: '7d' });

            req.session.user = {
              ...user, 
              token: token, // Stockez le jeton dans la session
            };

            const Newuser = req.session.user
            console.log(Newuser)
            // Créer un cookie persistant avec une date d'expiration
            const cookie = res.cookie('userToken', Newuser.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000, // Correspond à la durée de vie du cookie configurée dans express-session
              httpOnly: true, // Assurez-vous que le cookie est sécurisé
              // secure: true, // Décommentez ceci en production si vous utilisez HTTPS
            });

            console.log(cookie)

            const userWithProject = await User.findByPk(userExist.id, { 
                include: {
                    association: 'project',
                    include: 'listName'
                },
            })
            
            return res.json({
                message: "Vous êtes maintenant connecté, mais ne vous inquiétez pas, nous ne partagerons pas vos secrets avec le reste de l'univers, sauf si vous les avez déjà partagés sur les réseaux sociaux !",
                userId: userExist.id,
                userName: `${userExist.firstname} ${userExist.lastname}`,
                listes : userWithProject.project[0].dataValues.listName,
                projectId : userWithProject.project[0].dataValues.id,
            });
          }
        } catch (e) {
          console.trace(e);
          res.status(500).json(e.toString());
        }
    },
};

module.exports = userController