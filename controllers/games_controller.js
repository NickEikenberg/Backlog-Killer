const express = require('express');
const router = express.Router();

// SHOW
router.get('/:titleOfGame', (req, res) => {
  res.render('games/show.ejs', { tabTitle: req.params.titleOfGame });
});

// INDEX
router.get('/', (req, res) => {
  res.render('games/index.ejs', { tabTitle: 'Home' });
});

module.exports = router;
