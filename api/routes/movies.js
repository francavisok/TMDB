const express = require("express");
const axios = require("axios");
//const MoviesController = require('../controllers/movies')
const { validateToken } = require("../config/token");
const router = express.Router();
require("dotenv").config();


const tmdbAPI = "https://api.themoviedb.org/3";
const key = process.env.TMDB_KEY;

//ruta para buscar una peli en los input pasando query params name=loquesea
router.get("/search", (req, res, next) => {
  const name = req.query.name;

  axios
    .get(`${tmdbAPI}/search/movie?${key}&query=${name}`)
    .then((res) => res.data)
    .then((obj) => {
      res.send(obj.results);
    })
    .catch((error) => res.send(error));
});

//ruta para traer todas las pelis mas populares ord desc
router.get("/search/popular", (req, res, next) => {
  axios
    .get(`${tmdbAPI}/discover/movie?${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    .then((res) => res.data)
    .then((obj) => {
      res.send(obj.results);
    })
    .catch((error) => res.send(error));

});

//ruta para buscar todos los generos de pelis en español
router.get("/search/genres", (req, res, next) => {
  axios
    .get(`${tmdbAPI}/genre/movie/list?${key}&language=es`)
    .then((res) => res.data)
    .then((obj) => {
      res.send(obj.genres);
    })
    .catch((error) => res.send(error));
});

//ruta para seleccionar todas las pelis mas pop en ord desc de cada genero
router.get("/search/genres/:genreId", (req, res, next) => {
  const genre = req.params.genreId;
  axios
    .get(`${tmdbAPI}/discover/movie?${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
    .then((res) => res.data)
    .then((obj) => {
      res.send(obj.results);
    })
    .catch((error) => res.send(error));
});

//ruta para buscar data de una peli especifica con param id
router.get("/search/:id", (req, res, next) => {
  const id = req.params.id;
  axios
    .get(`${tmdbAPI}/movie/${id}?${key}&language=es&append_to_response=images`)
    .then((res) => res.data)
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => res.send(error));
});




module.exports = router;
