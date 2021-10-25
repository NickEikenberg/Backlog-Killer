const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');
const Game = require('../models/games');

//////////////////////
//// USER MENU

sessions.get('/user/:username', (req, res) => {
  res.render('sessions/main.ejs', {
    tabTitle: req.params.username,
    currentUser: req.session.currentUser,
    Games: Game,
  });
});

//////////////////////
//// USER AUTHENTICATION
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    tabTitle: 'Login',
    currentUser: req.session.currentUser,
  });
});

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.send('There was a problem');
    } else if (!foundUser) {
      res.send('<a href="/">No user found</a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log('User Logged In:', foundUser);
        res.redirect('/backlogkiller');
      } else {
        res.send('<a href="/">Password does not match</a>');
      }
    }
  });
});

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    console.log('User logged out');
    res.redirect('/');
  });
});

module.exports = sessions;
