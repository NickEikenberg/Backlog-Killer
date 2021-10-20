const express = require('express');
const games = express.Router();
const Game = require('../models/games');

// SHOW
games.get('/:titleOfGame', (req, res) => {
  res.render('games/show.ejs', { tabTitle: req.params.titleOfGame });
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
  Game.create(
    [
      {
        title: 'Silent Hill 2',
        releaseDate: 'September 24th, 2001',
        platform: 'PS2, Xbox',
        genre: 'Survival Horror',
        description:
          'Silent Hill 2 is a 2001 survival horror video game published by Konami for the PlayStation 2 and developed by Team Silent, part of Konami Computer Entertainment Tokyo. The second installment in the Silent Hill series, Silent Hill 2 centers on James Sunderland, a widower who journeys to the town of Silent Hill after receiving a letter from his dead wife informing him that she is waiting there for him. ',
        inBacklog: false,
        inNowPlaying: false,
        inFinished: false,
      },
    ],
    (error, data) => {
      res.redirect('/');
    }
  );
});

module.exports = games;
