import express from 'express';
import {
  createGame,
  getGames,
  getGameById,
  updateGame,
  deleteGame
} from '../controllers/gameControllers.js';

const router = express.Router();

router.post('/', createGame);          // Create
router.get('/', getGames);             // Get All
router.get('/:id', getGameById);       // Get by ID
router.put('/:id', updateGame);        // Update
router.delete('/:id', deleteGame);     // Delete

export default router;
