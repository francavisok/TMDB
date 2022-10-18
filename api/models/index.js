const Users = require("./Users");
const Movies = require("./Movies");
const Tvshows = require("./TvShows");

Users.belongsToMany(Movies, { as: "favorites", through: "favorites_movies" });
Movies.belongsToMany(Users, { as: "favorites", through: "favorites_movies" });

Users.belongsToMany(Tvshows, {
  as: "favoritestv",
  through: "favorites_tvshows",
});
Tvshows.belongsToMany(Users, {
  as: "favoritestv",
  through: "favorites_tvshows",
});

module.exports = { Users, Movies, Tvshows };
