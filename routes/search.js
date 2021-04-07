const express = require('express');
const router = express.Router();
const db = require('../models');

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

//get index of search results
router.get('/index', (req, res) => {
  db.user.findAll({    
    // include: [db.city, db.instrument, db.collaboration, db.genre],
    include: [
      { model: db.instrument,
        where: { name: "Drums" },
      },
      { model: db.collaboration,
        where: { type: "Shows" },
      },
      { model: db.genre,
        where: { name: "Experimental" },
      },
    ],  
    where: {
      isBand: false,
      cityId: 1
      //influences (%___%):
    },
    order: [['name', 'ASC']]
    // include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((foundUsers) => {
    // console.log(user.collaborations);
    res.render('search/index', {users: foundUsers})
  })
})

module.exports = router;