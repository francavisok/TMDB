const Sequelize = require("sequelize");
const db = require("../db");

class Tvshows extends Sequelize.Model {}
Tvshows.init(
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
  { sequelize: db, modelName: "tvshows" }
);

module.exports = Tvshows;