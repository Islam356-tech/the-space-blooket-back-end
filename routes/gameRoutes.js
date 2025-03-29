const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// CRUD Endpoints
router.post('/game', gameController.createGame);       // Create
router.get('/game', gameController.getGames);          // Read All
router.get('/game/:id', gameController.getGameById);    // Read One
router.put('/game/:id', gameController.updateGame);     // Update
router.delete('/game/:id', gameController.deleteGame);  // Delete

module.exports = router;
