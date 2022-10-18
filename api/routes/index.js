const express = require('express');
const router = express.Router();

const users = require('./users')
const movies = require('./movies')
const tv = require('./tv')
const favoritesMovies = require('./favoritesMovies')
const favoritesTv = require('./favoritesTv')


router.use('/users', users);
router.use('/movies', movies);
router.use('/tv', tv);
router.use('/favoritesMovies', favoritesMovies);
router.use('/favoritesTv', favoritesTv);


module.exports = router;