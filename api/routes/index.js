const express = require("express");
const router = express.Router();
const users = require("./users");
const movies = require("./movies");

router.use("/users", users);
router.use("/movies", movies);

module.exports = router;
