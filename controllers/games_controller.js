const express = require('express');
const games = express.Router();
const Game = require('../models/games');
const Seed = require('../models/gamesSeed');

const addGameToBacklog = (user, game) => {
  user.backlog.push(game);
};

///////////////////////////////////
////// BACKLOG CONTROLLER

// BACKLOG
games.get('/:titleOfGame/addToBacklog', (req, res) => {
  Game.find({ name: req.params.titleOfGame }, (err, game) => {
    req.session.currentUser.backlog.push(game[0]);

    res.redirect(`/backlogkiller/${game[0].name}`);
  });
});

games.get('/:id/addToNowPlaying', (req, res) => {
  Game.find({ id: req.params.id }, (err, game) => {
    let user = req.session.currentUser;
    user.nowPlaying.push(game);
    user.backlog.splice(
      user.backlog.indexOf(
        user.backlog.find((el) => el.id === req.params.id),
        1
      )
    );
    console.log(req.session.currentUser.nowPlaying.length);
    res.redirect(`/sessions/user/${req.session.currentUser.username}`);
  });
});

///////////////////////////////////
////// DELETE

games.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, (err, game) => {
    res.redirect('/backlogkiller');
  });
});

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
      currentUser: req.session.currentUser,
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
  res.render('games/new.ejs', {
    tabTitle: 'New',
    currentUser: req.session.currentUser,
  });
});

///////////////////////////////////
////// SHOW ROUTES

// ADD GAME TO BACKLOG
// games.post('/addToBacklog/:titleOfGame', (req, res) => {
//   console.log('/addToBacklog');
//   Game.find({ name: req.params.titleOfGame }, (err, game) => {
//     req.session.currentUser.backlog.push(game[0].title);
//   });
// });

// SHOW
games.get('/:titleOfGame', (req, res) => {
  //   res.render('games/show.ejs', { tabTitle: req.params.titleOfGame });
  Game.find({ name: req.params.titleOfGame }, (err, game) => {
    res.render('games/show.ejs', {
      tabTitle: game[0].title,
      game: game,
      name: req.params.titleOfGame,
      currentUser: req.session.currentUser,
    });
  });
});

///////////////////////////////////
////// PATCH ROUTES

// PATCH BACKLOG
games.patch('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, (err, game) => {
    res.redirect(`/backlogkiller/${game.name}`);
  });
});

///////////////////////////////////
////// INDEX AND SEED

// INDEX
games.get('/', (req, res) => {
  Game.find({}, (error, allGames) => {
    res.render('games/index.ejs', {
      tabTitle: 'Home',
      games: allGames,
      currentUser: req.session.currentUser,
    });
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
