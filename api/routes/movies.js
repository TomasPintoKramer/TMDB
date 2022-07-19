const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/single/:media/:id", (req, res, next) => {
  const { id, media } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=22ffb1f173ebcdc0620712cb4161e744`
    )
    .then((movie) => res.send(movie.data))
    .catch(next);
});

router.get("/:media/:title", (req, res, next) => {
  const { title, media } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/search/${media}?api_key=22ffb1f173ebcdc0620712cb4161e744&query=${title}`
    )
    .then((r) => res.send(r.data.results))
    .catch(next);
});

router.get("/", (req, res, next) => {
  axios
    .get(
      "https://api.themoviedb.org/3/trending/all/day?api_key=22ffb1f173ebcdc0620712cb4161e744"
    )
    .then((r) => res.send(r.data.results))
    .catch(next);
});

module.exports = router;
