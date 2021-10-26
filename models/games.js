const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    releaseDate: { type: String },
    platform: { type: String },
    genre: { type: String },
    description: { type: String },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
