const express = require("express");
const router = express.Router();

const Users = require("../models/Users");
const TvShows = require("../models/TvShows");
const Movies = require("../models/Movies");

const { generateToken, validateToken } = require("../config/token");
const { validateAuth } = require("../middlewares/auth");

//ruta para crear usuario
router.post("/register", (req, res) => {
  Users.create(req.body).then((user) => {
    res.status(201).send("created");
  });
});

//ruta para loguarse / generar token / mandar cookie token
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

//ruta para chequear si hay una cookie con token valido 1 vez q renderiza la pagina
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

//ruta para borrar cookie y desloguear usuario
router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

//ruta para buscar todos los usuarios con sus respectivas pelis fav y series fav
/* router.get("/all", validateAuth, (req, res, next) => {
    Users.findAll({
      include: [
        {
          model: TvShows,
          as: "favoritestv",
          through: "favorites_tvshows",
        },
        {
          model: Movies,
          as: "favorites",
          through: "favorites_movies",
        },
      ],
    })
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
  }
); */

//ruta para traer todos los usurios (nombre, apellido, id)

router.get("/all", validateAuth, (req, res, next) => {
  Users.findAll({ attributes: ["name", "id", "lastname"] })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
});

//ruta para traer un usuario con todas sus pelis y series favoritas
router.get("/search/:id", validateAuth, (req, res, next) => {
  const userId = req.params.id;
  Users.findByPk(userId, {
    include: [
      {
        model: TvShows,
        as: "favoritestv",
        through: "favorites_tvshows",
      },
      {
        model: Movies,
        as: "favorites",
        through: "favorites_movies",
      },
    ],
    attributes: { exclude: ['password', 'salt'] }
  })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
