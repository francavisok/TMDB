const Sequelize = require("sequelize");
const db = require("../db");

class Movies extends Sequelize.Model {}
Movies.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    poster: {
      type: Sequelize.STRING,
    },
    overview: {
      type: Sequelize.TEXT,
    },
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
  },
  { sequelize: db, modelName: "movies" }
);

module.exports = Movies;