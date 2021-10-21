const express = require('express');
const games = express.Router();
const Game = require('../models/games');
const Seed = require('../models/gamesSeed');

///////////////////////////////////
////// EDIT ROUTES

games.put('/:titleOfGame', (req, res) => {
  Game.findOneAndUpdate(
    { name: req.params.titleOfGame },
    req.body,
    { new: true },
    (err, updatedGame) => {
      res.redirect(`/backlogkiller/${updatedGame.name}`);
    }
  );
});

games.get('/:titleOfGame/edit', (req, res) => {
  Game.find({ name: req.params.titleOfGame }, (err, foundGame) => {
    res.render('games/edit.ejs', {
      tabTitle: `Edit: ${foundGame.title}`,
      game: foundGame,
    });
  });
});

///////////////////////////////////
////// NEW ROUTES

games.post('/', (req, res) => {
  Game.create(req.body, (error, newGame) => {
    res.redirect('/backlogkiller');
  });
});

games.get('/new', (req, res) => {
  res.render('games/new.ejs', { tabTitle: 'New' });
});

///////////////////////////////////
////// SHOW ROUTES

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

///////////////////////////////////
////// PATCH ROUTES

// PATCH BACKLOG
games.patch('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, (err, game) => {
    console.log(game);
    res.redirect(`/backlogkiller/${game.name}`);
  });
});

///////////////////////////////////
////// INDEX AND SEED

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
