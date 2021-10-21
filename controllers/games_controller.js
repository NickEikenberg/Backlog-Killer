const express = require('express');
const games = express.Router();
const Game = require('../models/games');
const Seed = require('../models/gamesSeed');

// PATCH
games.patch('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, (err, game) => {
    console.log(game);
    res.redirect(`/backlogkiller/${game.name}`);
  });
});

// SHOW
games.get('/:titleOfGame', (req, res) => {
  //   res.render('games/show.ejs', { tabTitle: req.params.titleOfGame });
  Game.find({ name: req.params.titleOfGame }, (err, game) => {
    res.render('games/show.ejs', {
      tabTitle: game.title,
      game: game,
      name: req.params.titleOfGame,
    });
  });
});

// INDEX
games.get('/', (req, res) => {
  Game.find({}, (error, allGames) => {
    res.render('games/index.ejs', { tabTitle: 'Home', games: allGames });
  });
});

// SEED
games.get('/setup/seed', (req, res) => {
  Game.deleteMany({}, () => {});
  Game.create(Seed, (error, data) => {
    res.redirect('/');
  });
});

// JSON INDEX
games.get('/setup/JSON', (req, res) => {
  Game.find({}, (err, games) => {
    res.send(games);
  });
});

module.exports = games;
