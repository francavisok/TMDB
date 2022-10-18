const express = require("express");
const router = express.Router();

const Users = require("../models/Users");
const Movies = require("../models/Movies");

const { validateAuth } = require("../middlewares/auth");

//ruta para crear/agregar pelis a favoritos
router.post(
    "/",  validateAuth,  (req, res, next) => {
      const { userId } = req.query;
  
      Movies.findOrCreate({ where: req.body }).then(([movie, created]) => {
        Users.findByPk(userId)
          .then((user) => user.addFavorite(movie))
          .then(() => res.status(200).send(movie))
          .catch((error) => console.log(error));
      });
    }
  );
  
  //ruta para borrar de favoritos
  router.delete(
    "/",  validateAuth,  (req, res, next) => {
      const { userId, movieId } = req.query;
      Movies.findOne({where:{itemId: movieId}}).then((movie) => {
        Users.findByPk(userId)
          .then((user) => user.removeFavorite(movie))
          .then(() => res.status(200).send(movie))
          .catch((err) => res.status(500).send(err));
      });
    }
  );
  
  
  //ruta para traer un usuario con todas sus pelis favoritas
  router.get(
    "/", validateAuth, (req, res, next) => {
      const { userId } = req.query;
      Users.findByPk(userId, {
        include: { model: Movies, as: "favorites" },
      })
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(err));
    }
  );

module.exports = router;
