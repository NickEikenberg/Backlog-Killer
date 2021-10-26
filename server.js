////////////////////////////////////////////////
////////// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config();
const session = require('express-session');
const router = express.Router();

//////////////////
/////// PORT
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//////////////////////////
/////// DATABASE
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

///////////////////////////////////
////////// MIDDLEWARE
//use public folder for static assets
app.use(express.static('styles'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form

// USER AUTH
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

////////////////////////////////
////// CONTROLLERS
const gamesController = require('./controllers/games_controller');
const userController = require('./controllers/users_controller');
const sessionsController = require('./controllers/sessions_controller');
app.use('/backlogkiller', gamesController);
app.use('/users', userController);
app.use('/sessions', sessionsController);

/////////////////////
///// ROUTES

app.get('/', (req, res) => {
  res.redirect('/backlogkiller');
});

////////////////////////
///// LISTENER
app.listen(PORT, () => console.log('Listening on port:', PORT));
