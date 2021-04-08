const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');


//GET MAIN SEARCH FORM
router.get('/', (req, res) => {
  db.instrument.findAll()
  .then((instruments) => {
    db.genre.findAll()
    .then((genres) => {
      db.collaboration.findAll()
      .then((collaborations) => {
        db.city.findAll()
        .then((cities) => {
          // DO I NEED THE USER?
          // db.user.findOne({    
          //   where: {id: currentUser.id},         
          // }).then((user) => {
          res.render('search/main', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
          // })
        })
      })
    })
  })
})

//GET INDEX OF SEARCH RESULTS
router.get('/index', (req, res) => {
  console.log(req.query.instrumentCheck)
  db.user.findAll({    
    // include: [db.instrument, db.collaboration, db.genre],
    //HOW DO I SEARCH THROUGH ARRAYS?
    include: [

      { model: db.instrument,
        where: {
          // [Op.and]: [{ name: "Drums" }, { name: "Cello" }]},
            // name: {[Op.and]: ["Drums", "Cello"]}}
          name: ["Drums", "Cello"] },
      },
      // { model: db.collaboration,
      //   where: { type: "Shows" },
      // },
      // { model: db.genre,
      //   where: { name: "Experimental" },
      // },
    ],  
    where: {
      isBand: false, //req.query.isBand,
      // cityId: req.query.city
      //influences (%___%): split(",")
    },
    order: [['name', 'ASC']]
    // include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((foundUsers) => {
    // console.log(user.collaborations);
    res.render('search/index', {users: foundUsers})
  })
})

module.exports = router;
