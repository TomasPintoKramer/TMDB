const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const passport = require("passport");
const S = require("sequelize");


router.get("/search/:value", (req, res, next) => {
  const value = req.params.value.slice(1).toLowerCase();
  Users.findOne({
    where: {
      [S.Op.or]: [
        {
          name: { [S.Op.iLike]: value },
        },
        { userName: { [S.Op.iLike]: value } },
      ],
    },
  })
    .then((user) => res.send(user))
    .catch(next);
});

router.get("/collection/:id", (req, res, next) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then((user) => res.status(200).send(user.favourites))
    .catch(next);
});

router.post("/register", (req, res, next) => {
  Users.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(next);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  req.login(req.user, function (err) {
    if (err) {
      return next(err);
    }
    return res.send(req.user);
  });
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  });
});

router.put("/:id/add_favourites", (req, res, next) => {
  const id = req.params.id;
  Users.findByPk(id)
    .then((user) => {
      const movie=user.favourites.find((movie)=> movie.id===req.body.id? true:false)
      // console.log(user.favourites.includes(req.body.id))
      if (!movie){
        user.favourites.push(req.body);
        Users.update(
          { favourites: user.favourites },
          { where: { id: id }, returning: true }
          )
          .then((data) => res.send(data[1][0].favourites))
          .catch(next);}
        })
        .catch(next);
      });
      
      router.put("/:id/delete_favourites", (req, res, next) => {
        const id = req.params.id;
        Users.findByPk(id)
        .then((user) => {
          const index = user.favourites.findIndex((f) => f.id === req.body.id);
          if(index!=-1){
      user.favourites.splice(index, 1);
      Users.update(
        { favourites: user.favourites },
        { where: { id: id }, returning: true }
      )
        .then((data) => res.send(data[1][0].favourites))
        .catch(next);}
    })
    .catch(next);
});

module.exports = router;
