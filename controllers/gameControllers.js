const gameSchema = require('../models/Game.js');

// Create Game
exports.createGame = async (req, res) => {
  try {
    const game = new gameSchema(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All Games
exports.getGames = async (req, res) => {
  try {
    const games = await gameSchema.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Single Game
exports.getGameById = async (req, res) => {
  try {
    const game = await gameSchema.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Game
exports.updateGame = async (req, res) => {
  try {
    const game = await gameSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Game
exports.deleteGame = async (req, res) => {
  try {
    const game = await gameSchema.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
