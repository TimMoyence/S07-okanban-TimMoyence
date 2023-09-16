const { User } = require("../models")
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");

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

          await User.create({
            firstname,
            lastname,
            email,
            password : hash,
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
            req.session.user = userExist;

            // ! Recuperer le user avec ses projet et les mettre a dispo dans le front
            const userWithProject = await User.findByPk(userExist.id, { 
                include : 'project',
            })
            // ? une fois la récupération du projet faite Atention a bien récuperer les projets pour les mettre dans req.session
            console.log(userWithProject.project)
            // const projectOfThisUser = userWithProject.dataValues.project
            // req.session.project = projectOfThisUser
            console.log(userExist)
            return res.json({
                message: "Vous êtes maintenant connecté, mais ne vous inquiétez pas, nous ne partagerons pas vos secrets avec le reste de l'univers, sauf si vous les avez déjà partagés sur les réseaux sociaux !",
                userId: userExist.id,
                userName: `${userExist.firstname} ${userExist.lastname}`
            });
          }
        } catch (e) {
          console.trace(e);
          res.status(500).json(e.toString());
        }
    },
};

module.exports = userController