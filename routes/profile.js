const express = require('express');
const router = express.Router();
const db = require('../models');

//get new profile form
router.get('/new/:id', (req, res) => {
  db.instrument.findAll()
  .then((instruments) => {
    db.genre.findAll()
    .then((genres) => {
      db.collaboration.findAll()
      .then((collaborations) => {
        db.city.findAll()
        .then((cities) => {
          db.user.findOne({    
            where: {id: req.user.id},         
          }).then((user) => {
          res.render('profile/new', {user: req.user, instruments: instruments, genres: genres, cities: cities, collaborations: collaborations})
          })
        })
      })
    })
  })
})

//post new profile form
router.post('/new/:id', (req, res) => {
  db.user.update({
    isBand: false, //TODO value from radio form?
    name: req.body.name,       
    influences: [req.body.influences],
    recordingCredits: [req.body.recordingCredits],
    canRecordRemotely: false, //TODO value from radio form?
    spotifyEmbedUrl: req.body.spotifyEmbedUrl,
    soundcloudEmbedUrl: req.body.soundcloudEmbedUrl,
    youtubeEmbedUrl: req.body.youtubeEmbedUrl,
    localDraw: req.body.localDraw,
    nationalDraw: req.body.nationalDraw,
    //TODO: associate city, instruments, genres, collaboration
  }, {
    where: { id: req.params.id }
    // [note: the ‘user’ argument does not return the user data, just the number of rows updated]
  }).then(function(updated) {
    db.city.findOne({
      where: {name: req.body.city}
  }).then(function(city) {
    db.user.findOne({
      where: { id: req.params.id }
  }).then(function(user) {
    city.addUser(user)
    // console.log("********", user.cityId, "********");
    res.redirect('/');
  }).catch(error => {
    // FLASH
    req.flash('error', error.message);
    res.redirect(`/profile/new/${req.params.id}`);
    // res.redirect(`/profile/new/${user.id}`);
  });
});
});
});

//get profile by user id
router.get('/:id', (req, res) => {
  db.user.findOne({    
    where: {id: req.params.id},
    include: [db.city, db.instrument, db.genre, db.collaboration]
  }).then((user) => {
    console.log(user.collaborations);
    res.render('profile/profile', {user: user})
  })
})

module.exports = router;
