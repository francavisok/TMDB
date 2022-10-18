const express = require("express");
const router = express.Router();

const Users = require("../models/Users");
const Tvshows = require('../models/TvShows')

const { validateAuth } = require("../middlewares/auth");

//ruta para crear/agregar programa tv a favoritos
router.post(
    "/", validateAuth, (req, res, next) => {
      const { userId } = req.query;
  
      Tvshows.findOrCreate({ where: req.body }).then(([tvShow, created]) => {
        Users.findByPk(userId)
          .then((user) => user.addFavoritestv(tvShow))
          .then(() => res.status(200).send(tvShow))
          .catch((error) => console.log(error));
      });
    }
  );
  
  //ruta para borrar de favoritos

  router.delete(
    "/", validateAuth, (req, res, next) => {
      const { userId, tvShowId } = req.query;
      Tvshows.findOne({where:{itemId: tvShowId}}).then((tv) => {
        Users.findByPk(userId)
          .then((user) => user.removeFavoritestv(tv))
          .then(() => res.status(200).send(tv))
          .catch((err) => res.status(500).send(err));
      });
    }
  );
  
  
  //ruta para traer un usuario con todos sus programas tv favoritos
  router.get(
    "/", validateAuth, (req, res, next) => {
      const { userId } = req.query;
      Users.findByPk(userId, {
        include: { model: Tvshows, as: "favoritestv" },
      })
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(err));
    }
  );

module.exports = router;