const express = require('express');
const cardController = require('./controllers/cardController');

const router = express.Router();

const listController = require('./controllers/listController')
const labelController = require('./controllers/labelController')
const tableController = require("./controllers/tableController");

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

// table
router.get('/table/:id', tableController.getTableOfUser)


// 404 
router.use((req, res) => {
    res.status(404).send('url not found');
})

module.exports = router;