const express = require('express');
const router = express.Router();
const db = require('../models');


//get index of search results
router.get('/', (req, res) => {
  db.user.findAll({    
    // include: [db.city, db.instrument, db.collaboration, db.genre],
    include: [
      { model: db.instrument,
        where: { name: "Cello" },
      },
    ],  
    where: {
      // '$user.instrument.name$': "Drums"
      isBand: false,
      // cityId: 1
      //instrument M:M
      //collaboration M:M
      //influences (%___%):
      //genres:
    },
    order: [['name', 'ASC']]
    // include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((foundUsers) => {
    // console.log(user.collaborations);
    res.render('search/index', {users: foundUsers})
  })
})

module.exports = router;
