import Game from '../models/Game.js';

// controllers/gameController.js
export const createGame = async (req, res) => {
  console.log("Incoming data:", req.body);  // 🔍 Log this!

  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    console.error("Error in createGame:", error.message);
    res.status(400).json({ error: error.message });
  }
};
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.status(200).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.status(200).json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
