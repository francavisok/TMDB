const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  encryptPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  }
}
Users.init(
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();
  return user.encryptPassword(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = Users;
