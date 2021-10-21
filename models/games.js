const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    releaseDate: { type: String, required: true },
    platform: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    inBacklog: Boolean,
    inNowPlaying: Boolean,
    inFinished: Boolean,
  },
  { timestamps: true }
);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
