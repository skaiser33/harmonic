const express = require('express');
const router = express.Router();
const db = require('../models');

//get new profile form
router.get('/new/:id', (req, res) => {
    res.render('profile/new', {user: req.user})
})

//post new profile form
router.post('/new/:id', (req, res) => {
  db.user.update({
  }, {
    where: { id: req.body.id }
    // [note: the ‘user’ argument does not return the user data, just the number of rows updated]
  }).then(function(user) {
    console.log("********", user, "********");
    res.redirect('/');
  }).catch(error => {
    // FLASH
    req.flash('error', error.message);
    res.redirect(`/profile/new/${user.id}`);
  });
});



router.get('/:id', (req, res) => {
  db.user.findOne({    
    where: {id: req.user.id},
    include: [db.city, db.instrument, db.genre]
  }).then((user) => {
    // console.log(user.instruments[0].name);
    res.render('profile/profile', {user: user})
  })
})

module.exports = router;
