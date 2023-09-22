const express = require('express');
const cardController = require('./controllers/cardController');

const router = express.Router();

const listController = require('./controllers/listController')
const labelController = require('./controllers/labelController')
const projectController = require("./controllers/projectController");
const userController = require('./controllers/userController');
const userMiddleware = require('./middleware/userMiddleware')

router.use(userMiddleware)

router.get("/", (req, res) => {
  res.sendFile('index.html', {root: './dist'});
});

// list
router.get('/lists', listController.getLists)
router.get('/lists/:id', listController.getOneList)
router.get('/lists/:id/cards', listController.getOneListAndCards)
router.post('/lists', listController.createList) 
router.patch('/lists/:id', listController.updateList)
router.delete('/lists/:id', listController.deleteList)

// card
router.get('/cards', cardController.getCards);
router.get('/cards/:id', cardController.getOneCard)
router.post('/cards', cardController.createCard)
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

// label
router.post('/cards/:id/tags', labelController.associateLabelToCard);
router.delete('/cards/:cardId/label/:labelId', labelController.removeLabelFromCard)

// Projet
// Route permet de récupérer en fonction de l'ID mais si plusieurs projet il faut pouvoir laiszser au client le choix ? Menu déroulant ? 
router.get('/project/:id', projectController.getProjectName);
// Route permettant de créer un projet a appeler a la première connection (login)
router.post('/project', projectController.createProject)
// Vu que l'on est sur une single page avec une seul application pour chaque personne il y aura un id de 1

// User 
router.post('/register', userController.registerAction)
router.post('/login', userController.loginAction);
router.get('/getSessionData', (req, res) => {
  const userToken = req.headers.authorization; // Récupérez le jeton de session depuis les en-têtes

  // Vérifiez le jeton de session et renvoyez les données de l'utilisateur appropriées
  if (isValidSession(userToken)) {
    const userData = getUserDataFromToken(userToken);
    res.json(userData);
  } else {
    res.status(401).json({ message: 'Session non valide' });
  }
});

// 404 
router.use((req, res) => {
    res.status(404).send('url not found');
})

module.exports = router;