const express = require('express');
const router = express.Router();
const db = require('../models');


//get index of search results
router.get('/', (req, res) => {
  db.user.findAll({    
    // where: {id: req.params.id},
    // include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((foundUsers) => {
    // console.log(user.collaborations);
    res.render('search/index', {users: foundUsers})
  })
})

module.exports = router;
