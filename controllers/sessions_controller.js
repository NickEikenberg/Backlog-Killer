const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { tabTitle: 'Login' });
});

module.exports = sessions;
