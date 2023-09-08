// Middleware pour gérer les informations utilisateur
const userMiddleware = (req, res, next) => {
  // Initialise la variable "user" dans les données locales de la réponse à "false"
  // Ceci est utile pour indiquer qu'aucun utilisateur n'est connecté par défaut
  res.locals.user = false;

  // Vérifie si un utilisateur est connecté en vérifiant la session
  if (req.session.user) {
    // Si un utilisateur est connecté, met à jour la variable "user" avec les données de l'utilisateur
    res.locals.user = req.session.user;
  }

  // Passe au middleware suivant
  next();
};

// Exporte le middleware pour une utilisation dans d'autres parties de l'application
module.exports = userMiddleware;
