const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users');

users.get('/new', (req, res) => {
  res.render('users/new.ejs', { tabTitle: 'Create Account' });
});

module.exports = users;
