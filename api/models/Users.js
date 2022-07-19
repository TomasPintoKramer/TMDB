const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userName: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    salt: {
      type: Sequelize.STRING,
    },
    favourites: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
  },
  { sequelize: db, modelName: "user" }
);

Users.addHook("beforeCreate", (user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => (user.password = hash))
    .catch((err) => console.log("error de hook", err));
});

module.exports = Users;
