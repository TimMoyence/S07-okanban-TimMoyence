// Middleware pour vérifier le rôle d'administrateur de l'utilisateur
const adminMiddleware = (req, res, next) => {
  // Vérifie si un utilisateur est connecté (utilisation des sessions)
  if (!req.session.user) {
    // Si l'utilisateur n'est pas connecté, redirige-le vers la page de connexion
    return res.redirect("/login");
  }

  // Si l'utilisateur est connecté, vérifie son rôle
  if (req.session.user.role === "admin") {
    // Si l'utilisateur a le rôle d'administrateur, passe à la prochaine étape du traitement
    return next();
  }

  // Si l'utilisateur est connecté mais n'a pas le rôle d'administrateur, génère une erreur d'accès refusé
  const error = new Error("Accès refusé");
  error.status = 401;

  // Passe l'erreur au gestionnaire d'erreurs
  next(error);
};

// Exporte le middleware pour une utilisation dans d'autres parties de l'application
module.exports = adminMiddleware;
