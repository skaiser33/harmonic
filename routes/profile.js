const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:id', (req, res) => {
  console.log("****************",req.user.id);
  db.user.findOne({
    
    where: {id: req.user.id},
    include: [db.city]
  }).then((user) => {res.render('profile', {user: user})
  })
})

module.exports = router;
