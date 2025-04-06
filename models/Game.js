// models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  public: { type: Boolean, default: true }, // public field
  createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
