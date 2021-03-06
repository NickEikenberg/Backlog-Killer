const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users');

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
    tabTitle: 'Create Account',
    currentUser: req.session.currentUser,
  });
});

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect('/sessions/new');
  });
});

module.exports = users;
